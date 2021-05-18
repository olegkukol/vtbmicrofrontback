import { RequestHandler } from 'express';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  const { limit = 50, offset = 0, searchQuery } = req.query;

  try {
    // tracking https://github.com/prisma/prisma/issues/5042 for exclude fields params
    const employees = await db.employee.findMany({
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
      },
      take: Number(limit),
      skip: Number(offset)
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
