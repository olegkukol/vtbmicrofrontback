import { RequestHandler } from 'express';
import { pick } from 'lodash';
import db from '../../prisma';

const approve: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const currentUser = await db.employee.findUnique({
      where: {
        id: req.session.userId
      }
    });

    if (currentUser.role === 'EMPLOYEE') {
      return res.status(400).send({
        message: 'PERMISSION DENIED'
      });
    }

    if (currentUser.role === 'HEAD_OF_TEAM') {
      await db.stagingOfApproving.update({
        where: {
          vacantionAppliationId: id
        },
        data: {
          isTeamLeaderApproved: true
        }
      });
    }

    if (currentUser.role === 'HEAD_OF_STREAM') {
      await db.stagingOfApproving.update({
        where: {
          vacantionAppliationId: id
        },
        data: {
          isStreamItLeaderApproved: true
        }
      });
    }

    if (currentUser.role === 'HEAD_OF_DEPARTMENT') {
      await db.stagingOfApproving.update({
        where: {
          vacantionAppliationId: id
        },
        data: {
          isHeaderOfDepartmentApproved: true
        }
      });
    }

    const currentStage = await db.stagingOfApproving.findUnique({
      where: {
        vacantionAppliationId: id
      }
    });

    const stagesOfApproving = [
      {
        fio: currentStage.teamItLeaderFio,
        role: 'HEAD_OF_TEAM',
        approved: currentStage.isTeamLeaderApproved
      },
      {
        fio: currentStage.streamItLeaderFio,
        role: 'HEAD_OF_STREAM',
        approved: currentStage.isStreamItLeaderApproved
      },
      {
        fio: currentStage.headOfDepartmentFio,
        role: 'HEAD_OF_DEPARTMENT',
        approved: currentStage.isHeaderOfDepartmentApproved
      }
    ];

    const vacantionAppliation = await db.vacantionApplication.findUnique({
      where: {
        id: req.params.id
      },
      rejectOnNotFound: true
    });

    return res.send(
      pick({ ...vacantionAppliation, stagesOfApproving }, [
        'startDate',
        'endDate',
        'stagesOfApproving'
      ])
    );
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default approve;
