import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionPlanSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  numberOfDays: Joi.number().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionPlanSchema.validateAsync(req.body);

    const vacantionPlan = await db.vacantionPlan.create({
      data
    });

    res.send(vacantionPlan);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
