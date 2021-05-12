import { RequestHandler } from 'express';
import Joi from 'joi';
import { omit } from 'lodash';
import db from '../../prisma';

export const skillSchema = Joi.object().keys({
  name: Joi.string().required(),
  level: Joi.number().required()
});

const addSkill: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    const data = await skillSchema.validateAsync(req.body);

    const skill = await db.skill.create({
      data: {
        ...data,
        employeeId: userId
      }
    });

    res.send(omit(skill, ['employeeId']));
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default addSkill;
