import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const employeeSchema = Joi.object().keys({
  fio: Joi.string().required(),
  position: Joi.string().required(),
  role: Joi.string().required(),
  type: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await employeeSchema.validateAsync(req.body);

    const employee = await db.employee.create({
      data
    });

    res.send(employee);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
