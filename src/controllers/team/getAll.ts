import { RequestHandler } from 'express';
import Joi from 'joi';

export const teamSchema = Joi.object().keys({
  streamId: Joi.string()
});

const getAll: RequestHandler = async (req, res) => {
  try {
    // const result = await teamSchema.validateAsync(req.query);
    // const teams = await Team.find(result.streamId ? { streamId: result.streamId } : null);
    // res.send(teams);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
