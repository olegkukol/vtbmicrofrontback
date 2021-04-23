import { RequestHandler } from 'express';
import Joi from 'joi';

export const vacantionPlanSchema = Joi.object().keys({
  startDate: Joi.string().required(),
  numberOfDays: Joi.number().required()
});

const createVacantionPlan: RequestHandler = async (req, res) => {
  try {
    // const { id } = req.params;
    // const vacantionPlan = await vacantionPlanSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default createVacantionPlan;
