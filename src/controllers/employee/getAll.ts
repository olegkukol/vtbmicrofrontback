import { RequestHandler } from 'express';

const getAll: RequestHandler = async (req, res) => {
  try {
    // const employee = await Employee.find();
    // res.send(employee);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

export default getAll;
