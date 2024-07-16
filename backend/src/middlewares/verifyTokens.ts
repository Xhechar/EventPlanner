import { Request, Response, NextFunction } from 'express';
import { TokenInfo } from '../interfaces/interfaces';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface extendedRequest extends Request {
  info?: TokenInfo;
}

export const verifyTokens = (req: extendedRequest, res: Response, next: NextFunction) => {

  try {

    let token = req.headers['token'] as string;

  if (!token) {
    return res.status(401).json({
      error: "You do not have access, to use this service"
    })
  }
  else {

    let data = jwt.verify(token, process.env.SECRET_KEY as string) as TokenInfo;

    req.info = data;

  }

  }
  catch (error) {
    res.status(501).json({
      error
    })
  }

  next();
}