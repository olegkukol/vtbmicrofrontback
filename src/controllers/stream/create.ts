import { RequestHandler } from 'express';
import Joi from 'joi';

export const streamSchema = Joi.object().keys({
  name: Joi.string().required(),
  headOfDepartmentId: Joi.string().required(),
  itLeaderId: Joi.string().required()
});

const create: RequestHandler = async (req, res) => {
  try {
    // const result = await streamSchema.validateAsync(req.body);
    // const stream = new Stream(result);
    // await stream.save();
    // res.send(stream.toJSON());
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default create;
