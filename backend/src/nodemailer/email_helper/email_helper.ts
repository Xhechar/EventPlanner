import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { MailConfigurations, MessageOptions } from '../../interfaces/interfaces';

dotenv.config();

const mail_configurations:MailConfigurations = ({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.PASS as string
  }
})

function createTrasporter(mail_configurations: MailConfigurations) {
  return nodemailer.createTransport(mail_configurations);
};

export const sendMail = async (messageOptions: MessageOptions) => {
  let transporter = createTrasporter(mail_configurations);

  await transporter.verify();

  transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      console.log('Error occurred while sending mail: ', err);
    } else {
      console.log('Message sent: ', info.response);
    }
  })
}