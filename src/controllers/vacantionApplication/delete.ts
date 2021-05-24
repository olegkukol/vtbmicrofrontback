import { RequestHandler } from 'express';
import db from '../../prisma';

const deleteById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await db.stageOfApproving.deleteMany({
      where: { vacantionAppliationId: id }
    });

    await db.vacantionApplication.delete({
      where: { id }
    });

    return res.send(200);
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default deleteById;
