import { RequestHandler } from 'express';
import { pick } from 'lodash';
import db from '../../prisma';

const get: RequestHandler = async (req, res) => {
  try {
    const vacantionPlan = await db.vacantionPlan.findUnique({
      where: {
        employeeId: req.session.userId
      }
    });

    res.send(pick(vacantionPlan, ['startDate', 'endDate']));
  } catch (err) {
    res.status(400).send({
      message: 'Not found'
    });
  }
};

export default get;
