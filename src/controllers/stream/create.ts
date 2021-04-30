import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../../prisma';

export const streamSchema = Joi.object().keys({
  name: Joi.string().required(),
  headOfDepartmentId: Joi.string().required(),
  streamItLeaderId: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await streamSchema.validateAsync(req.body);

    const stream = await db.stream.create({
      data
    });

    res.send(stream);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
