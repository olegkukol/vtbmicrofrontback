import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stream = await db.stream.findUnique({
      where: {
        id
      },
      rejectOnNotFound: true
    });

    res.send(omit(stream, ['headOfDepartmentId', 'streamItLeaderId']));
  } catch (err) {
    res.status(400).send({
      message: `Not found stream: ${id} `
    });
  }
};

export default getById;
