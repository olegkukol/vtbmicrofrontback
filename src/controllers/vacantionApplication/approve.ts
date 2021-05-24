import { RequestHandler } from 'express';
import { findIndex } from 'lodash';
import VacantionApplication from '../../models/VacantionApplication';
import db from '../../prisma';
import logger from '../../logger';

const approve: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const vacantionAppliation: VacantionApplication = await db.vacantionApplication.findUnique({
      where: { id }
    });

    if (vacantionAppliation.approverId !== req.session.user.id) {
      return res.status(400).send({
        message: 'Incorrect current approver'
      });
    }

    await db.stageOfApproving.updateMany({
      where: {
        vacantionAppliationId: id,
        approverId: vacantionAppliation.approverId
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

    const activeStageIndex = findIndex(stages, stage => vacantionAppliation.approverId === stage.Approver.id);

    const nextStage = activeStageIndex < stages.length - 1 ? stages[activeStageIndex + 1] : stages[activeStageIndex];

    await db.vacantionApplication.update({
      where: { id },
      data: {
        approverId: nextStage?.Approver.id,
        status: approvedStages.length === 3 ? 'APPROVED' : 'ACTIVE'
      }
    });

    return res.send(200);
  } catch (err) {
    logger.log({
      level: 'info',
      message: err.message
    });
    return res.status(400).send({
      message: err.message
    });
  }
};

export default approve;
