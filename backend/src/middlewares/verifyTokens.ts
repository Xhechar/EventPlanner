import { Request, Response, NextFunction } from 'express';
import { TokenInfo } from '../interfaces/interfaces';
import jwt, { decode } from 'jsonwebtoken';
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

    jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
      if(err) {
        if (err.name == "TokenExpiredError") {
          return res.status(401).json({
            error: "Your session has expired, please log in again"
          })
        }
        else if (err.name == "JsonWebTokenError") {
          return res.status(401).json({
            error: "Invalid token, please log in again"
          })
        }
        else {
          return res.status(501).json({
            error: "An error occurred while verifying the token"
          })
        }
      }
      req.info = data as TokenInfo;
    })

  }

  }
  catch (error) {
    res.status(501).json({
      error
    })
  }

  next();
}