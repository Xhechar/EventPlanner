import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoute } from './routers/user.router';
import { events_route } from './routers/event.router';
import { book_route } from './routers/booking.router';
import { auth_route } from './routers/auth.router';
import { welcomeUser } from './nodemailer/services/WelcomeUser';
import cron from 'node-cron'

dotenv.config();

const app = express();

app.use(json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/users', userRoute);
app.use('/events', events_route);
app.use('/bookings', book_route);
app.use('/auth', auth_route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: err.message
  })
});

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

// const mail = express();

// mail.listen(3001, async () => {
//   console.log("Node mailer is running on port 3001");
  
//   const checkDB = async () => {
//     cron.schedule('*/5 * * * * * ', async () => {
//       console.log("Checking the database");
      
//       await welcomeUser();
//     })
//   }
//   checkDB();
// })