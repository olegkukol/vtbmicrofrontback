import { RequestHandler } from 'express';
import Employee from '../../models/Employee';
import db from '../../prisma';
import logger from '../../logger';

type SelectedEmployee = Pick<Employee, 'fio' | 'type' | 'skills' | 'teamId' | 'streamId' | 'position'>;

const get: RequestHandler = async (req, res) => {
  try {
    const profile: SelectedEmployee = await db.employee.findUnique({
      where: {
        id: req.session.user.id
      },
      select: {
        fio: true,
        position: true,
        teamId: true,
        streamId: true,
        role: true,
        skills: true,
        type: true
      }
    });

    return res.send(profile);
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

export default get;
