import { RequestHandler } from 'express';

import Team from '../../models/Team';
import db from '../../prisma';

type SelectedTeam = Pick<Team, 'id' | 'name'>;

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const team: SelectedTeam = await db.team.findUnique({
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
