import lodash from 'lodash'
import { Helper } from '../../db_helper/dbhelper';
import ejs from 'ejs'
import { MessageOptions, User } from '../../interfaces/interfaces';
import dotenv from 'dotenv'
import { sendMail } from '../email_helper/email_helper';

dotenv.config()


export const welcomeUser = async () => {
  
  let users = (await Helper.query('select * from users where isWelcomed = 0')).recordset;

  console.log(users);
  

  if (lodash.isEmpty(users)) {
    console.log("All users have been welcomed successfully")
  }
  else {
    for (let user of users as User[]) {
      
      ejs.renderFile('d:/MyProjects_T2G/x_planner/backend/EmailHtmlTemplates/welcome.user.ejs',{UserName: user.fullname} ,async(err, data) => {
        
        let messageOptions: MessageOptions = {
          from: process.env.EMAIL as string,
          to: user.email,
          subject: "Welcome to X-Planner",
          html: data
        }

        await sendMail(messageOptions);

        let isSent = (await Helper.query(`update users set isWelcomed = 1 where user_id = '${user.user_id}'`)).rowsAffected;

        if (isSent[0] < 1) {
          console.log("Error sending email to user", user.email)
        }
        else {
          console.log("Email sent successfully to user", user.email)
        }

      })

    }
  }

}