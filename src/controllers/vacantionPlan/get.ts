import { RequestHandler } from 'express';
import db from '../../prisma';

const get: RequestHandler = async (req, res) => {
  try {
    const vacantionPlan = await db.vacantionPlan.findUnique({
      where: {
        employeeId: req.session.userId
      },
      select: {
        startDate: true,
        endDate: true
      }
    });

    res.send(vacantionPlan);
  } catch (err) {
    res.status(400).send({
      message: 'Not found'
    });
  }
};

export default get;
