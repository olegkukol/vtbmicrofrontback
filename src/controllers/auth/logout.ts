import { RequestHandler } from 'express';

const logout: RequestHandler = async (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
};

export default logout;
