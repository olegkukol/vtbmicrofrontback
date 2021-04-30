import { RequestHandler } from 'express';
import { pick } from 'lodash';
import db from '../../prisma';

const get: RequestHandler = async (req: any, res) => {
  try {
    const vacantionAppliation = await db.vacantionApplication.findUnique({
      where: {
        employeeId: req.session.userId
      },
      include: {
        stages: true
      }
    });

    const stagingOfApproving = await db.stagingOfApproving.findUnique({
      where: {
        vacantionAppliationId: vacantionAppliation.id
      }
    });

    console.log(vacantionAppliation.stages);

    const stagesOfApproving = [
      {
        fio: stagingOfApproving.teamItLeaderFio,
        role: 'HEAD_OF_TEAM',
        approved: stagingOfApproving.isTeamLeaderApproved
      },
      {
        fio: stagingOfApproving.streamItLeaderFio,
        role: 'HEAD_OF_STREAM',
        approved: stagingOfApproving.isStreamItLeaderApproved
      },
      {
        fio: stagingOfApproving.headOfDepartmentFio,
        role: 'HEAD_OF_DEPARTMENT',
        approved: stagingOfApproving.isHeaderOfDepartmentApproved
      }
    ];

    return res.send(
      pick(
        {
          ...vacantionAppliation,
          stagesOfApproving
        },
        ['startDate', 'endDate', 'stagesOfApproving']
      )
    );
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default get;
