import { Request, Response, NextFunction } from 'express';

const IsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth handler req: ', req);
  if (req.sessionID) {
    next();
  } else {
    res.status(401).send({
      message: 'Unauthorized. Request sessionID is not valid'
    });
  }
};

export default IsAuthenticated;
