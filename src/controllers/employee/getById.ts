import { RequestHandler } from 'express';

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // const employee = await Employee.findById(id);
    // res.send(employee.toJSON());
  } catch (err) {
    res.status(400).send({
      message: `Not found employee: ${id} `
    });
  }
};

export default getById;
