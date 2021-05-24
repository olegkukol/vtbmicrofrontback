import { RequestHandler } from 'express';

import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  const { streamId, teamId } = req.query;

  const { user } = req.session;

  try {
    const params = [
      teamId && {
        teamId: String(teamId)
      },
      streamId && {
        streamId: String(streamId)
      },
      user.role === 'HEAD_OF_TEAM' && {
        teamId: user.teamId
      },
      user.role === 'HEAD_OF_STREAM' && {
        streamId: user.streamId
      }
    ].filter(Boolean);

    const applications = await db.vacantionApplication.findMany({
      where: {
        AND: params
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
      },
      take: res.pagination.limit,
      skip: res.pagination.skip
    });

    const mapped = applications.map(application => ({
      id: application.id,
      startDate: application.startDate,
      endDate: application.endDate,
      employeeFio: application.employee.fio,
      teamName: application.team.name,
      streamName: application.stream.name,
      approverFio: application.approver.fio,
      stages: application.stages.map(stage => ({
        approved: stage.approved,
        role: stage.Approver.role,
        fio: stage.Approver.fio
      }))
    }));

    return res.send({
      list: mapped,
      ...res.pagination
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

export default getAll;
