import { RequestHandler } from 'express';
import { isAfter, differenceInDays } from 'date-fns';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionAppliationSchema = Joi.object().keys({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  substituteEmployeeId: Joi.string()
});

const DAYS_LIMIT_PER_YEAR = 28;

const create: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionAppliationSchema.validateAsync(req.body);

    if (isAfter(data.startDate, data.endDate)) {
      return res.status(400).send({
        message: 'Invalid date provided'
      });
    }

    const applications = await db.vacantionApplication.findMany({
      where: {
        employeeId: req.session.user.id
      }
    });

    const daysRemaining = applications.reduce(
      (acc, application) => acc + differenceInDays(application.startDate, application.endDate),
      DAYS_LIMIT_PER_YEAR
    );

    if (daysRemaining < 0) {
      return res.status(400).send({
        message: 'Vacantion limit exceeded'
      });
    }

    const user = await db.employee.findUnique({
      where: {
        id: req.session.user.id
      },
      include: {
        Stream: {
          include: {
            streamLeader: true,
            headOfDepartment: true
          }
        },
        Team: {
          include: {
            teamLeader: true
          }
        }
      }
    });

    const vacantionAppliation = await db.vacantionApplication.create({
      data: {
        ...data,
        currentApproverId: user.Team.teamLeader.id,
        employeeId: req.session.user.id,
        teamId: req.session.user.teamId,
        streamId: req.session.user.streamId,
        stages: {
          create: [
            {
              order: 0,
              approved: false,
              approverId: user.Team.teamLeader.id
            },
            {
              order: 1,
              approved: false,
              approverId: user.Stream.streamLeader.id
            },
            {
              order: 2,
              approved: false,
              approverId: user.Stream.headOfDepartment.id
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

    return res.send({
      item: {
        startDate: vacantionAppliation.startDate,
        endDate: vacantionAppliation.endDate,
        currentApproverFio: user.Team.teamLeader.fio,
        status: vacantionAppliation.status,
        stages: vacantionAppliation.stages.map(stage => ({
          approved: stage.approved,
          role: stage.Approver.role,
          fio: stage.Approver.fio
        }))
      },
      daysRemaining
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default create;
