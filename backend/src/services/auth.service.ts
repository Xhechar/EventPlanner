import jwt from 'jsonwebtoken';
import { Logins } from '../interfaces/interfaces';
import { Helper } from '../db_helper/dbhelper';
import lodash from 'lodash';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()

export const loginUser = async (logins: Logins) => {
  
  let emailExists = (await Helper.query(`select * from users where email = '${logins.email}'`)).recordset;

  if (lodash.isEmpty(emailExists)) {
    return {
      error: "The email passed does not exist, consider signing up then try again"
    }
  }

  let hashedPassword = emailExists[0].password;

  let passwordMatches = bcrypt.compareSync(logins.password, hashedPassword);

  if (!passwordMatches) {
    return {
      error: "Incorrect Password Provided, Please try again"
    }
  }
  else {
    let token = jwt.sign(emailExists[0], process.env.SECRET_KEY as string, {
      expiresIn: '2h'
    });

    return {
      message: "Welcome Back,You have successfully logged in",
      role: emailExists[0].role,
      token: token
    }
  }

}