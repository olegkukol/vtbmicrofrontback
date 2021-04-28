import { Request, Response, NextFunction } from 'express';

type SessionRequest = Request & {
  sessionID: string;
  session: { isLogged: boolean };
};

const IsAuthenticated = (req: SessionRequest, res: Response, next: NextFunction) => {
  if (req.session.isLogged && req.sessionID) {
    next();
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    });
  }
};

export default IsAuthenticated;
