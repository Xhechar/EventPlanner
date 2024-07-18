import lodash from 'lodash'
import { Helper } from '../../db_helper/dbhelper';
import ejs from 'ejs'


export const welcomeUser = async () => {
  
  let users = (await Helper.query('select * from users where isWelcomed = 1')).recordset;

  if (lodash.isEmpty(users)) {
    console.log("All users have been welcomed successfully")
  }
  else {
    for (let user of users) {
      
      ejs.renderFile('')

    }
  }

}