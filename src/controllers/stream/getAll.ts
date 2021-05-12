import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const streams = await db.stream.findMany();

    const mapped = streams.map(stream => omit(stream, ['headOfDepartmentId', 'streamItLeaderId']));

    res.send(mapped);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
