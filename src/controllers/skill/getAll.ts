import { RequestHandler } from 'express';
import Skill from '../../models/Skill';
import db from '../../prisma';
import logger from '../../logger';

const getAll: RequestHandler = async (req, res) => {
  try {
    logger.debug('Getting skills list');
    const skills: Omit<Skill, 'employeeId' | 'Employee'>[] = await db.skill.findMany({
      where: {
        employeeId: req.session.user.id
      },
      select: {
        id: true,
        name: true,
        level: true
      }
    });

    res.send(skills);
  } catch (err) {
    res.status(400).send({
      message: `Not found skills for: ${req.session.user.id} `
    });
  }
};

export default getAll;
