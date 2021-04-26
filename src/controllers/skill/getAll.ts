import { RequestHandler } from 'express';
import db from '../../prisma';

const getAll: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const skills = await db.skill.findMany({
      where: {
        employeeId: id
      }
    });

    res.send(skills);
  } catch (err) {
    res.status(400).send({
      message: `Not found skills for: ${id} `
    });
  }
};

export default getAll;
