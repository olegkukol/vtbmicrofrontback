import { RequestHandler } from 'express';
import { omit } from 'lodash';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  try {
    const skills = await db.skill.findMany({
      where: {
        employeeId: req.session.user.id
      }
    });

    res.send(skills.map(skill => omit(skill, ['employeeId'])));
  } catch (err) {
    res.status(400).send({
      message: `Not found skills for: ${req.session.user.id} `
    });
  }
};

export default getAll;
