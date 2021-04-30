import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req: any, res) => {
  try {
    const employees = await db.employee.findMany();

    const ommited = employees.map(employee => omit(employee, ['password', 'username']));

    return res.send(ommited);
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
