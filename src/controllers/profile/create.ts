import { Request, Response } from 'express';
import Joi from 'joi';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';

export const profileSchema = Joi.object().keys({
  fio: Joi.string().required(),
  position: Joi.string().required(),
  role: Joi.string().required(),
  type: Joi.string().required(),
  teamId: Joi.string(),
  streamId: Joi.string()
});

type LoginRequest = Request & {
  sessionID: string;
  session: { isLogged: boolean; userId: string };
};

const create = async (req: LoginRequest, res: Response) => {
  try {
    const data = await profileSchema.validateAsync(req.body);

    const profile = await db.employee.update({
      where: {
        id: req.session.userId
      },
      data
    });

    return res.send(omit(profile, ['username', 'password']));
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    return res.status(400).send({
      message: err.message
    });
  }
};

export default create;
