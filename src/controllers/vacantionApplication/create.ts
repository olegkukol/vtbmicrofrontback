import { RequestHandler } from 'express';
import Joi from 'joi';

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
  // try {
  // } catch (err) {
  //   res.status(400).send({
  //     message: err.message
  //   });
  // }
};

export default create;
