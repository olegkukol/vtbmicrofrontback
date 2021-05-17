import { RequestHandler } from 'express';
import db from '../../prisma';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await db.team.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        streamId: false,
        teamLeaderId: false
      },
      rejectOnNotFound: true
    });

    res.send(team);
  } catch (err) {
    res.status(400).send({
      message: `Not found team: ${id} `
    });
  }
};

export default getById;
