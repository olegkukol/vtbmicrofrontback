import { RequestHandler } from 'express';
import Joi from 'joi';
import { hashSync } from 'bcrypt';
import db from '../../prisma';
import logger from '../../logger';
import Employee from '../../models/Employee';

export const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const register: RequestHandler = async (req, res) => {
  try {
    const { username, password } = await registerSchema.validateAsync(req.body);

    const foundedUser: Employee = await db.employee.findUnique({
      where: {
        username
      }
    });

    if (foundedUser) {
      return res.status(400).send({
        message: 'User already exists'
      });
    }

    const newUser = await db.employee.create({
      data: {
        username: username.toLowerCase(),
        password: hashSync(password, 8)
      }
    });

    req.session.user = newUser;
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
