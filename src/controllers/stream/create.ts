import { RequestHandler } from 'express';
import Joi from 'joi';
import Stream from '../../models/Stream';
import db from '../../prisma';

export const streamSchema = Joi.object().keys({
  name: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    const data = await streamSchema.validateAsync(req.body);

    const stream: Stream = await db.stream.create({
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
