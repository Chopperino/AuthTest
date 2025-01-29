import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { DbUser } from '../types/database/DbUser';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: DbUser;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.SECRET || 'secret') as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { country: true },
    });

    if (user) req.user = user as DbUser;
    next();
  } catch (error) {
    next();
  }
};