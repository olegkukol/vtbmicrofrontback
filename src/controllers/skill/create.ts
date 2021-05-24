import { RequestHandler } from 'express';
import Joi from 'joi';
import Skill from '../../models/Skill';
import db from '../../prisma';

export const skillSchema = Joi.object().keys({
  name: Joi.string().required(),
  level: Joi.number().required()
});

const addSkill: RequestHandler = async (req, res) => {
  try {
    const data = await skillSchema.validateAsync(req.body);

    const skill: Omit<Skill, 'employeeId' | 'Employee'> = await db.skill.create({
      data: {
        ...data,
        employeeId: req.session.user.id
      },
      select: {
        id: true,
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
