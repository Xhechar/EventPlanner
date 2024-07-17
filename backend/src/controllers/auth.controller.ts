import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";


export const loginUsers = async (req: Request, res: Response) => {
  
  try {
    let response = await loginUser(req.body);

    return res.status(201).json(response);
  }
  catch (error) {
    return res.json({error})
  }

}