import { RequestHandler } from 'express';
import Stream from '../../models/Stream';
import db from '../../prisma';

type SelectedStream = Pick<Stream, 'id' | 'name'>;

const getAll: RequestHandler = async (req, res) => {
  try {
    const streams: SelectedStream[] = await db.stream.findMany({
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
