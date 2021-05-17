import { RequestHandler } from 'express';
import db from '../../prisma';
import logger from '../../logger';

const get: RequestHandler = async (req, res) => {
  try {
    const profile = await db.employee.findUnique({
      where: {
        id: req.session.user.id
      },
      select: {
        fio: true,
        position: true,
        role: true
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
