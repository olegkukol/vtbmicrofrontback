import { RequestHandler } from 'express';
import Stream from '../../models/Stream';
import db from '../../prisma';

type SelectedStream = Pick<Stream, 'id' | 'name'>;

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stream: SelectedStream = await db.stream.findUnique({
      where: {
        id
      },
      rejectOnNotFound: true,
      select: {
        id: true,
        name: true
      }
    });

    res.send(stream);
  } catch (err) {
    res.status(400).send({
      message: `Not found stream: ${id} `
    });
  }
};

export default getById;
