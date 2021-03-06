import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionPlanSchema = Joi.object().keys({
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
});

const get: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionPlanSchema.validateAsync(req.body);

    const vacantionPlan = await db.vacantionPlan.create({
      data: {
        ...data,
        employeeId: req.session.userId
      },
      select: {
        startDate: true,
        endDate: true
      }
    });

    return res.send(vacantionPlan);
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default get;
