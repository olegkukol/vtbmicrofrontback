import { RequestHandler } from 'express';

import Team from '../../models/Team';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const teams: Team[] = await db.team.findMany({
      select: {
        id: true,
        name: true,
        streamId: true,
        teamLeaderId: true
      }
    });

    res.send(teams);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
