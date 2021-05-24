import { RequestHandler } from 'express';
import Joi from 'joi';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';
import Employee from '../../models/Employee';

export const profileSchema = Joi.object().keys({
  fio: Joi.string().required(),
  position: Joi.string().required(),
  role: Joi.string().required(),
  type: Joi.string().required(),
  teamId: Joi.string(),
  streamId: Joi.string()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await profileSchema.validateAsync(req.body);

    const profile: Employee = await db.employee.update({
      where: {
        id: req.session.user.id
      },
      data
    });

    req.session.user = profile;

    if (data.role === 'HEAD_OF_STREAM') {
      await db.stream.update({
        where: {
          id: data.streamId
        },
        data: {
          streamLeaderId: profile.id
        }
      });
    }

    if (data.role === 'HEAD_OF_TEAM') {
      await db.team.update({
        where: {
          id: data.teamId
        },
        data: {
          teamLeaderId: profile.id
        }
      });
    }

    if (data.role === 'HEAD_OF_DEPARTMENT') {
      await db.stream.updateMany({
        data: {
          headOfDepartmentId: profile.id
        }
      });
    }

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
