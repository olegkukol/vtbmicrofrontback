import { RequestHandler } from 'express';
import { differenceInDays } from 'date-fns';
import db from '../../prisma';
import logger from '../../logger';

const DAYS_LIMIT_PER_YEAR = 28;

const getById: RequestHandler = async (req, res) => {
  const { user } = req.session;

  try {
    const applications = await db.vacantionApplication.findMany({
      where: {
        employeeId: user.id
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        approver: true,
        employee: {
          select: {
            fio: true
          }
        },
        team: {
          select: {
            name: true
          }
        },
        stream: {
          select: {
            name: true
          }
        },
        stages: {
          orderBy: {
            order: 'asc'
          },
          select: {
            approved: true,
            id: true,
            Approver: true
          }
        }
      }
    });

    const mapped = applications.map(application => ({
      id: application.id,
      startDate: application.startDate,
      endDate: application.endDate,
      employeeFio: application.employee.fio,
      teamName: application.team.name,
      streamName: application.stream.name,
      currentApproverFio: application.approver.fio,
      stages: application.stages.map(stage => ({
        approved: stage.approved,
        role: stage.Approver.role,
        fio: stage.Approver.fio
      }))
    }));

    const daysRemaining = applications.reduce(
      (acc, application) => acc - differenceInDays(application.endDate, application.startDate),
      DAYS_LIMIT_PER_YEAR
    );

    return res.send({
      list: mapped,
      daysRemaining
    });
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    return res.status(400).send({
      message: err.message
    });
  }
};

export default getById;
