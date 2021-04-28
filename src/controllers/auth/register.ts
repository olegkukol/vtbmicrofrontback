import { RequestHandler } from 'express';
import Joi from 'joi';
import { hashSync } from 'bcrypt';
import db from '../../prisma';
import logger from '../../logger';

export const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fio: Joi.string().required(),
  position: Joi.string().required(),
  role: Joi.string().required(),
  type: Joi.string().required()
});

const register: RequestHandler = async (req, res) => {
  try {
    const data = await registerSchema.validateAsync(req.body);

    const foundedUser = await db.employee.findUnique({
      where: {
        username: data.username
      }
    });

    if (foundedUser) {
      return res.status(400).send({
        message: 'User already exists'
      });
    }

    const newUser = await db.employee.create({
      data: {
        ...data,
        password: hashSync(data.password, 8)
      }
    });

    return res.status(200).send({
      fio: newUser.fio,
      position: newUser.position,
      role: newUser.role,
      type: newUser.type,
      id: newUser.id
    });
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    return res.status(400).send({
      message: 'User already exists'
    });
  }
};

export default register;
