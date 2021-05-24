import { RequestHandler } from 'express';
import Employee from '../../models/Employee';
import db from '../../prisma';
import logger from '../../logger';

type SelectedEmployee = Pick<Employee, 'id' | 'fio' | 'type' | 'skills' | 'Team' | 'Stream'>;

const getAll: RequestHandler = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    // tracking https://github.com/prisma/prisma/issues/5042 for exclude fields params
    const employees: SelectedEmployee[] = await db.employee.findMany({
      select: {
        skills: true,
        fio: true,
        id: true,
        type: true,
        password: false,
        username: false,
        Team: true,
        Stream: true
      },
      where: {
        fio: {
          contains: searchQuery && String(searchQuery),
          mode: 'insensitive'
        }
      }
    });

    const mapped = employees.map(employee => ({
      skills: employee.skills,
      fio: employee.fio,
      id: employee.id,
      type: employee.type,
      teamId: employee?.Team?.id || null,
      streamId: employee?.Stream?.id || null
    }));

    return res.send(mapped);
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
