import { RequestHandler } from 'express';
import Joi from 'joi';
import { hashSync } from 'bcrypt';
import db from '../../prisma';
import logger from '../../logger';

export const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
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

    req.session.userId = newUser.id;
    req.session.isLogged = true;

    return res.send({
      id: newUser.id,
      username: newUser.username
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
