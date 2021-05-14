import { Request, Response, NextFunction } from 'express';

const checkPermissions = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user.role === 'EMPLOYEE') {
    res.status(401).send({
      message: 'Permission denied'
    });
  } else {
    next();
  }
};

export default checkPermissions;
