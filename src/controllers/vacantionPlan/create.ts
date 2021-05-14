import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionPlanSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  endDate: Joi.string().required()
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

    res.send(vacantionPlan);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default get;
