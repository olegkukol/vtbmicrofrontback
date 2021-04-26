import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const vacantionAppliationSchema = Joi.object().keys({
  employeeId: Joi.string().required(),
  teamId: Joi.string().required(),
  streamId: Joi.string().required(),
  startDate: Joi.string().required(),
  numberOfDays: Joi.number().required(),
  substituteEmployeeId: Joi.string().required(),
  headOfDepartmentId: Joi.string().required(),
  approvalTeamItLeaderId: Joi.string().required(),
  approvalStreamItLeaderId: Joi.string().required(),
  approvalHeadOfDepartmentId: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await vacantionAppliationSchema.validateAsync(req.body);

    const vacantionAppliation = await db.employee.create({
      data
    });

    res.send(vacantionAppliation);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
