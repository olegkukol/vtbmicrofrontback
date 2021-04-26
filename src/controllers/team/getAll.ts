import { RequestHandler } from 'express';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const teams = await db.team.findMany();
    res.send(teams);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
