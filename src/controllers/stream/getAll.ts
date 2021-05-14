import { RequestHandler } from 'express';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const streams = await db.stream.findMany({
      select: {
        id: true,
        name: true
      }
    });

    res.send(streams);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
