import { RequestHandler } from 'express';
import { pick } from 'lodash';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionAppliationSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  substituteEmployeeId: Joi.string()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionAppliationSchema.validateAsync(req.body);

    const user = await db.employee.findUnique({
      where: {
        id: req.session.user.id
      },
      include: {
        Stream: true,
        Team: true
      }
    });

    const [headOfDepartment, streamLeader, teamLeader] = await db.employee.findMany({
      where: {
        OR: [
          {
            id: user.Team.teamItLeaderId
          },
          {
            id: user.Stream.streamItLeaderId
          },
          {
            id: user.Stream.headOfDepartmentId
          }
        ]
      }
    });

    const vacantionAppliation = await db.vacantionApplication.create({
      data: {
        ...data,
        currentApproverId: teamLeader.id,
        employeeId: req.session.user.id,
        teamId: req.session.user.teamId,
        streamId: req.session.user.streamId,
        approvalTeamItLeaderId: teamLeader.id,
        approvalStreamItLeaderId: streamLeader.id,
        approvalHeadOfDepartmentId: headOfDepartment.id,
        stages: {
          create: [
            {
              order: 0,
              approved: false,
              approverId: teamLeader.id
            },
            {
              order: 1,
              approved: false,
              approverId: streamLeader.id
            },
            {
              order: 2,
              approved: false,
              approverId: headOfDepartment.id
            }
          ]
        }
      },
      include: {
        stages: {
          select: {
            approved: true,
            id: true,
            Approver: true
          }
        }
      }
    });

    await db.employee.update({
      where: {
        id: req.session.user.id
      },
      data: {
        vacantionApplicationId: vacantionAppliation.id
      }
    });

    const mappedStages = vacantionAppliation.stages.map(stage => ({
      approved: stage.approved,
      role: stage.Approver.role,
      fio: stage.Approver.fio
    }));

    return res.send({
      startDate: vacantionAppliation.startDate,
      endDate: vacantionAppliation.endDate,
      currentApproverFio: teamLeader.fio,
      stages: mappedStages
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default create;
