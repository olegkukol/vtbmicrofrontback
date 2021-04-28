import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  try {
    const employees = await db.employee.findMany();
    const filtered = employees.map(employee => omit(employee, ['password', 'username']));

    res.send(filtered);
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
