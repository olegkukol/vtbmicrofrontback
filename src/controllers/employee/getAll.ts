import { RequestHandler } from 'express';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  try {
    // tracking https://github.com/prisma/prisma/issues/5042 for exclude fields params
    const employees = await db.employee.findMany({
      select: {
        skills: true,
        fio: true,
        id: true,
        type: true,
        password: false,
        username: false
      }
    });

    return res.send(employees);
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
