import { RequestHandler } from 'express';

const getAll: RequestHandler = async (req, res) => {
  try {
    // const streams = await Stream.find();
    // res.send(streams);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
