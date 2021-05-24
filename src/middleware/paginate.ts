import { Request, Response, NextFunction } from 'express';
import db from '../prisma';

const paginate = (model: string) => async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const total = await (db as any)[model].count();

  res.pagination = {
    limit,
    page,
    total,
    skip
  };

  next();
};

export default paginate;
