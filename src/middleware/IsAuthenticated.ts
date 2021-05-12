import { Request, Response, NextFunction } from 'express';

const IsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isLogged && req.sessionID) {
    next();
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    });
  }
};

export default IsAuthenticated;
