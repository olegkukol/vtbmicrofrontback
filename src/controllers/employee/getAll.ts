import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req: any, res) => {
  try {
    const { userId } = req.session;

    const currentUser = await db.employee.findUnique({
      where: {
        id: userId
      }
    });

    if (currentUser.role === 'EMPLOYEE') {
      return res.send([]);
    }

    const resolveFindQueryByRole = (role: string) => {
      if (role === 'HEAD_OF_TEAM') {
        return {
          teamId: currentUser.teamId
        };
      }

      if (role === 'HEAD_OF_STREAM') {
        return {
          streamId: currentUser.streamId
        };
      }

      return {};
    };

    const employees = await db.employee.findMany({
      where: resolveFindQueryByRole(currentUser.role)
    });

    const ommited = employees.map(employee => omit(employee, ['password', 'username']));

    return res.send(ommited);
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    return res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
