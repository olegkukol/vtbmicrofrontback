import { RequestHandler } from 'express';

const getById: RequestHandler = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const stream = await Stream.findById(id);
  //   res.send(stream.toJSON());
  // } catch (err) {
  //   res.status(400).send({
  //     message: `Not found stream: ${id} `
  //   });
  // }
};

export default getById;
