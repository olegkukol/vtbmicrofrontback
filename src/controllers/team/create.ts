import Joi from 'joi';
import { RequestHandler } from 'express';

import Team from '../../models/Team';
import db from '../../prisma';

export const teamSchema = Joi.object().keys({
  name: Joi.string().required(),
  streamId: Joi.string().required(),
  teamLeaderId: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await teamSchema.validateAsync(req.body);

    const team: Team = await db.team.create({
      data
    });

    res.send(team);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
