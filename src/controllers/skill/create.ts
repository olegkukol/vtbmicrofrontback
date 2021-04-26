import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const streamSchema = Joi.object().keys({
  name: Joi.string().required(),
  level: Joi.number().required(),
  emlpoyeeId: Joi.string().required()
});

const addSkill: RequestHandler = async (req, res) => {
  try {
    const data = await streamSchema.validateAsync(req.body);

    const skill = await db.skill.create({
      data
    });

    res.send(skill);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default addSkill;
