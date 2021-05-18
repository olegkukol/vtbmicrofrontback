import { RequestHandler } from 'express';
import Joi from 'joi';
import { compareSync } from 'bcrypt';
import db from '../../prisma';

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const login: RequestHandler = async (req, res) => {
  try {
    const data = await loginSchema.validateAsync(req.body);

    const user = await db.employee.findUnique({
      where: {
        username: data.username
      }
    });

    if (!user) {
      return res.status(400).send({
        message: 'User not found'
      });
    }

    const isPasswordValid = compareSync(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: 'Inccorect password'
      });
    }

    req.session.user = user;
    req.session.isLogged = true;

    return res.status(200).send({
      id: user.id,
      fio: user.fio,
      role: user.role,
      teamId: user.teamId,
      streamId: user.streamId,
      username: user.username
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default login;
