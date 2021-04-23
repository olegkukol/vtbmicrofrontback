import { RequestHandler } from 'express';
import Joi from 'joi';

export const teamSchema = Joi.object().keys({
  name: Joi.string().required(),
  streamId: Joi.string().required(),
  itLeaderId: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    // const result = await teamSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
