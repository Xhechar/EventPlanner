import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenInfo } from '../interfaces/interfaces';

dotenv.config();

export interface extendedRequest extends Request {
  info?: TokenInfo;
}

export const verifyTokens = (req: extendedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        error: "You do not have access, to use this service"
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY as string, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            error: "Your session has expired, please log in again"
          });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            error: "Invalid token, please log in again"
          });
        } else {
          return res.status(501).json({
            error: "An error occurred while verifying the token"
          });
        }
      }
      req.info = data as TokenInfo;
      next();
    });
  } catch (error) {
    return res.status(501).json({
      error: "An error occurred while processing your request"
    });
  }
};
