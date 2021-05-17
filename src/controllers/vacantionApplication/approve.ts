import { RequestHandler } from 'express';
import { findIndex } from 'lodash';
import db from '../../prisma';

const approve: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const vacantionAppliation = await db.vacantionApplication.findUnique({
      where: { id }
    });

    if (vacantionAppliation.currentApproverId !== req.session.user.id) {
      return res.status(400).send({
        message: 'Incorrect current approver'
      });
    }

    await db.stageOfApproving.updateMany({
      where: {
        vacantionAppliationId: id,
        approverId: vacantionAppliation.currentApproverId
      },
      data: {
        approved: true
      }
    });

    const stages = await db.stageOfApproving.findMany({
      orderBy: {
        order: 'asc'
      },
      where: {
        vacantionAppliationId: id
      },
      select: {
        approved: true,
        Approver: true
      }
    });

    const approvedStages = stages.filter(stage => stage.approved);

    const activeStageIndex = findIndex(stages, stage => vacantionAppliation.currentApproverId === stage.Approver.id);

    const nextStage = activeStageIndex < stages.length - 1 ? stages[activeStageIndex + 1] : stages[activeStageIndex];

    await db.vacantionApplication.update({
      where: { id },
      data: {
        currentApproverId: nextStage?.Approver.id,
        status: approvedStages.length === 3 ? 'APPROVED' : 'ACTIVE'
      }
    });

    return res.send(200);
  } catch (err) {
    return res.status(400).send({
      message: err.message
    });
  }
};

export default approve;
