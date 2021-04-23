import { RequestHandler } from 'express';
import Joi from 'joi';

export const skillSchema = Joi.object().keys({
  name: Joi.string().required(),
  level: Joi.number().required()
});

const addSkill: RequestHandler = async (req, res) => {
  try {
    // const skill = await skillSchema.validateAsync(req.body);
    // const { id } = req.params;
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default addSkill;
