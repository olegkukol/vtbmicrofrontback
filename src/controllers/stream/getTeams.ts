import { RequestHandler } from 'express';
import Team from '../../models/Team';
import db from '../../prisma';

type SelectedTeam = Pick<Team, 'id' | 'name' | 'streamId'>;

const getTeams: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const teams: SelectedTeam[] = await db.team.findMany({
      where: {
        streamId: id
      },
      select: {
        id: true,
        name: true,
        streamId: true,
        teamLeaderId: false
      }
    });

    res.send(teams);
  } catch (err) {
    res.status(400).send({
      message: `Not found teams in stream: ${id} `
    });
  }
};

export default getTeams;
