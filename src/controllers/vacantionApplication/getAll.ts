import { RequestHandler } from 'express';
import Employee from '../../models/Employee';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  const { offset = 0, limit = 50 } = req.query;

  try {
    const handleEmployeeRole = (role: string, employee: Partial<Employee>) => {
      if (role === 'HEAD_OF_TEAM') {
        return {
          teamId: employee.teamId
        };
      }

      if (role === 'HEAD_OF_STREAM') {
        return {
          streamId: employee.streamId
        };
      }

      return {};
    };

    const applications = await db.vacantionApplication.findMany({
      where: handleEmployeeRole(req.session.user.role, req.session.user),
      select: {
        id: true,
        startDate: true,
        endDate: true,
        currentApprover: true,
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
      },
      take: Number(limit),
      skip: Number(offset)
    });

    const mapped = applications.map(application => ({
      id: application.id,
      startDate: application.startDate,
      endDate: application.endDate,
      employeeFio: application.employee.fio,
      teamName: application.team.name,
      streamName: application.stream.name,
      currentApproverFio: application.currentApprover.fio,
      stages: application.stages.map(stage => ({
        approved: stage.approved,
        role: stage.Approver.role,
        fio: stage.Approver.fio
      }))
    }));

    return res.send(mapped);
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

export default getAll;
