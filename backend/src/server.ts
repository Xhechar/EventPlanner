import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(json());

app.use(cors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message
  })
});

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})