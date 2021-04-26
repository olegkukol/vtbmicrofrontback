import { RequestHandler } from 'express';
import db from '../../prisma';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const vacantionPlan = await db.vacantionPlan.findUnique({
      where: {
        id
      },
      rejectOnNotFound: true
    });

    res.send(vacantionPlan);
  } catch (err) {
    res.status(400).send({
      message: `Not found team: ${id} `
    });
  }
};

export default getById;
