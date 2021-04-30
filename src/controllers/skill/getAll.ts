import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';

const getAll: RequestHandler = async (req: any, res) => {
  const { userId } = req.session;

  try {
    const skills = await db.skill.findMany({
      where: {
        employeeId: userId
      }
    });

    res.send(skills.map(skill => omit(skill, ['employeeId'])));
  } catch (err) {
    res.status(400).send({
      message: `Not found skills for: ${userId} `
    });
  }
};

export default getAll;
