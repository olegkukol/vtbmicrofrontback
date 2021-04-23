import { RequestHandler } from 'express';

const getById: RequestHandler = async (req, res) => {
  // try {
  //   const stream = await Team.findById(id);
  //   res.send(stream.toJSON());
  // } catch (err) {
  //   res.status(400).send({
  //     message: `Not found stream: ${id} `
  //   });
  // }
};

export default getById;
