import { RequestHandler } from 'express';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const teams = await db.team.findMany({
      select: {
        id: true,
        name: true,
        streamId: false,
        teamItLeaderId: false
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
