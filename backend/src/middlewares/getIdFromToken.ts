import { Request, Response, NextFunction } from 'express';
import { extendedRequest } from './verifyTokens';
import { TokenInfo } from '../interfaces/interfaces';

export const getIdFromToken = async (req: extendedRequest):Promise<string> => {
  
  let info = req.info as TokenInfo;

  if (!info) {
    return ""
  }
  else {
    const user_id = info.user_id;

    return user_id
  }

}