import { RequestHandler } from 'express';
import db from '../../prisma';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await db.employee.findUnique({
      where: {
        id
      },
      rejectOnNotFound: true
    });

    res.send(employee);
  } catch (err) {
    res.status(400).send({
      message: `Not found stream: ${id} `
    });
  }
};

export default getById;
