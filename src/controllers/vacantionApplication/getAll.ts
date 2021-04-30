import { RequestHandler } from 'express';
import { pick } from 'lodash';
import Employee from '../../models/Employee';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req: any, res) => {
  try {
    const currentUser = await db.employee.findUnique({
      where: {
        id: req.session.userId
      }
    });

    if (currentUser.role === 'EMPLOYEE') {
      return res.send([]);
    }

    const handleEmployeeRole = (role: string, employee: Partial<Employee>) => {
      if (role === 'HEAD_OF_TEAM') {
        return {
          teamId: employee.teamId
        };
      }

      if (role === 'HEAD_OF_STREAM') {
        return {
          streamId: employee.streamId
        };
      }

      return {};
    };

    const applications = await db.vacantionApplication.findMany({
      where: handleEmployeeRole(currentUser.role, currentUser),
      include: {
        stages: true
      }
    });

    return res.send(
      applications.map(item => pick(item, ['startDate', 'endDate', 'stagesOfApproving']))
    );
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
