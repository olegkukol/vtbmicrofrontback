import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const skillSchema = Joi.object().keys({
  name: Joi.string().required(),
  level: Joi.number().required()
});

const addSkill: RequestHandler = async (req, res) => {
  try {
    const data = await skillSchema.validateAsync(req.body);

    const skill = await db.skill.create({
      data: {
        ...data,
        employeeId: req.session.user.id
      },
      select: {
        name: true,
        level: true
      }
    });

    res.send(skill);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default addSkill;
