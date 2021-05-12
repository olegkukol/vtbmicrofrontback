import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await db.employee.findUnique({
      where: {
        id
      },
      include: {
        skills: true
      },
      rejectOnNotFound: true
    });

    res.send(omit(employee, ['username', 'password']));
  } catch (err) {
    res.status(400).send({
      message: `Not found stream: ${id} `
    });
  }
};

export default getById;
