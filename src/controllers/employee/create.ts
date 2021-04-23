import { RequestHandler } from 'express';
import Joi from 'joi';

export const employeeSchema = Joi.object().keys({
  streamId: Joi.string().required(),
  teamId: Joi.string().required(),
  fio: Joi.string().required(),
  position: Joi.string().required(),
  role: Joi.string().required(),
  type: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    // const result = await employeeSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
