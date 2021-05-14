import { RequestHandler } from 'express';
import { pick } from 'lodash';
import db from '../../prisma';

const get: RequestHandler = async (req, res) => {
  try {
    const vacantionAppliation = await db.vacantionApplication.findUnique({
      where: {
        employeeId: req.session.user.id
      },
      include: {
        stages: {
          orderBy: {
            order: 'asc'
          },
          include: {
            Approver: true
          }
        },
        currentApprover: true
      }
    });

    if (!vacantionAppliation) {
      return res.send({});
    }

    const mappedStages = vacantionAppliation.stages.map(stage => ({
      approved: stage.approved,
      role: stage.Approver.role,
      fio: stage.Approver.fio
    }));

    return res.send(
      pick(
        {
          ...vacantionAppliation,
          currentApproverFio: vacantionAppliation.currentApprover.fio,
          stagesOfApproving: mappedStages
        },
        ['startDate', 'endDate', 'currentApproverFio', 'stagesOfApproving']
      )
    );
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default get;
