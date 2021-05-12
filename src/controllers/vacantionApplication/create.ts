import { RequestHandler } from 'express';
import Joi from 'joi';
import { pick } from 'lodash';
import db from '../../prisma';

export const vacantionAppliationSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  substituteEmployeeId: Joi.string()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionAppliationSchema.validateAsync(req.body);

    const currentUser = await db.employee.findUnique({
      where: {
        id: req.session.userId
      }
    });

    const stream = await db.stream.findUnique({
      where: {
        id: currentUser.streamId
      }
    });

    const team = await db.team.findUnique({
      where: {
        id: currentUser.teamId
      }
    });

    const vacantionAppliation = await db.vacantionApplication.create({
      data: {
        ...data,
        employeeId: req.session.userId,
        teamId: currentUser.teamId,
        streamId: currentUser.streamId,
        approvalTeamItLeaderId: team.teamItLeaderId,
        approvalStreamItLeaderId: stream.streamItLeaderId,
        approvalHeadOfDepartmentId: stream.headOfDepartmentId
      }
    });

    const teamLeader = await db.employee.findUnique({
      where: {
        id: team.teamItLeaderId
      }
    });

    const streamLeader = await db.employee.findUnique({
      where: {
        id: stream.streamItLeaderId
      }
    });

    const headOfDepartment = await db.employee.findUnique({
      where: {
        id: stream.headOfDepartmentId
      }
    });

    await db.stagingOfApproving.create({
      data: {
        vacantionAppliationId: vacantionAppliation.id,
        teamItLeaderFio: teamLeader.fio,
        streamItLeaderFio: streamLeader.fio,
        headOfDepartmentFio: headOfDepartment.fio,
        isTeamLeaderApproved: false,
        isStreamItLeaderApproved: false,
        isHeaderOfDepartmentApproved: false
      }
    });

    const stagesOfApproving = [
      { fio: teamLeader.fio, role: teamLeader.role, approved: false },
      { fio: streamLeader.fio, role: streamLeader.role, approved: false },
      { fio: headOfDepartment.fio, role: headOfDepartment.role, approved: false }
    ];

    return res.send(
      pick(
        {
          ...vacantionAppliation,
          stagesOfApproving
        },
        ['startDate', 'endDate', 'stagesOfApproving']
      )
    );
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default create;
