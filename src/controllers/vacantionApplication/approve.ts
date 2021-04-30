import { RequestHandler } from 'express';
import { pick } from 'lodash';
import db from '../../prisma';

const approve: RequestHandler = async (req: any, res) => {
  try {
    const vacantionAppliation = await db.vacantionApplication.findUnique({
      where: {
        id: req.params.id
      },
      rejectOnNotFound: true
    });

    return res.send(pick(vacantionAppliation, ['startDate', 'endDate', 'substituteEmployeeId']));
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default approve;
