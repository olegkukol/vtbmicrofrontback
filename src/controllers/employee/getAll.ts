import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  try {
    const employees = await db.employee.findMany({
      include: {
        skills: true
      }
    });

    // tracking https://github.com/prisma/prisma/issues/5042 for exclude fields params
    const mapped = employees.map(employee => omit(employee, ['password', 'username']));

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
