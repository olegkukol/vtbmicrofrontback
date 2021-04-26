import { RequestHandler } from 'express';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  try {
    const employees = await db.employee.findMany();
    res.send(employees);
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
