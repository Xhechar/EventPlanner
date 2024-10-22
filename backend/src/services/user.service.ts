import { Helper } from "../db_helper/dbhelper";
import { Book, User } from "../interfaces/interfaces";
import { v4 } from "uuid";
import lodash from "lodash";
import bcrypt from "bcrypt";

export class UserService {
  async registerUser(user: User) {
    let user_id = v4();

    let hashedPassword = bcrypt.hashSync(user.password, 12);

    let emailExists = (
      await Helper.query(`select * from users where email = '${user.email}'`)
    ).recordset;

    if (!lodash.isEmpty(emailExists)) {
      return {
        error:
          "Email already exists. Consider login or register with a different email.",
      };
    }

    let phoneExists = (
      await Helper.query(
        `select * from users where phone_number = '${user.phone_number}'`
      )
    ).recordset;

    if (!lodash.isEmpty(phoneExists)) {
      return {
        error: "Phone number provide exists.",
      };
    }

    let result = (
      await Helper.execute("register_user", {
        user_id: user_id,
        fullname: user.fullname,
        phone_number: user.phone_number,
        email: user.email,
        country: user.country,
        address: user.address,
        profile_image: user.profile_image,
        password: hashedPassword,
        role: user.role,
      })
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Error registering user",
      };
    } else {
      return {
        message: "Account registered successfully.",
      };
    }
  }

  async updateUser(user_id: string, user: User) {
    let userExists = (
      await Helper.query(
        `select * from users where user_id = '${user_id}' AND isDeleted = 0`
      )
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "User does not exist.",
      };
    } else {
      let result = (
        await Helper.execute("modify_user", {
          user_id: userExists[0].user_id,
          fullname: user.fullname,
          phone_number: user.phone_number,
          email: user.email,
          country: user.country,
          address: user.address,
          profile_image: user.profile_image,
          role: user.role
        })
      ).rowsAffected;

      if (result[0] < 1) {
        return {
          error: "Error updating user fields",
        };
      } else {
        return {
          message: "Update successfully completed.",
        };
      }
    }
  }

  async getAllUsers() {
    let result = (await Helper.query("select * from users where isDeleted = 0 and role != 'admin'"))
      .recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "Error fetching all users",
      };
    } else {
      return {
        message: "Users successfully retrieved",
        users: result as User[],
      };
    }
  }

  async getAllDeletedUsers() {
    let result = (await Helper.query("select * from users where isDeleted = 1"))
      .recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "Error fetching deleted users users",
      };
    } else {
      return {
        message: "Users successfully retrieved deleted",
        users: result as User[],
      };
    }
  }

  async getUserById(user_id: string) {
    let result = (
      await Helper.query(
        `select * from users where user_id = '${user_id}' AND isDeleted = 0`
      )
    ).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "The specified user does not exist",
      };
    } else {
      return {
        message: "User successfully retrieved",
        user: result as User[],
      };
    }
  }

  async getUserByRole() {
    let result = (
      await Helper.query(
        "select * from users where role = 'manager' AND isDeleted = 0 and isManager = 0"
      )
    ).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "There are no users of the specified role available",
      };
    } else {
      return {
        message: "Successfully retrieved users for managerial previllages",
        users: result as User[],
      };
    }
  }

  //does not require endpoint route because it is called by another function

  async getUsersByEventId(event_id: string) {
    let requiredUsers: string[] = [];
    let returnedUsers: User[] = [];
    let bookings: Book[] = [];

    let bookedUsers: Book[] = (
      await Helper.query(`select * from bookings where event_id = '${event_id}'`)
    ).recordset;

    if (lodash.isEmpty(bookedUsers)) {
      return {
        error: "Event not yet booked",
      };
    } else {
      for (let bookedUser of bookedUsers) {
        requiredUsers.push(bookedUser.user_id);
        bookings.push(bookedUser);
      }

      if (requiredUsers.length > 0) {
        for (let requiredUser of requiredUsers) {
          let result = (await Helper.query(`select * from users where user_id = '${requiredUser}' and isDeleted = 0`)).recordset as User[];
          if (result) {
            returnedUsers.push(result[0]);
          }
        }
      }
      return {
        message: "Users successfully fetched",
        users: returnedUsers,
        bookings: bookings
      };
    }
  }

  async getAllUsersByDateCreated() {
    let result = (
      await Helper.query(
        "select * from users where createdAt >= DATEADD(DAY, -10, GETDATE()) AND isDeleted = 0 and role != 'admin'"
      )
    ).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "Error fetching the specified users",
      };
    } else {
      return {
        message: "Users created recently successfully retrieved",
        users: result as User[],
      };
    }
  }

  async updateRoleByAdmin(user_id: string) {
    let result = (
      await Helper.query(
        `update users set isManager = 1 where user_id = '${user_id}' AND isDeleted = 0`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve the specified user to manager",
      };
    } else {
      return {
        message: "User updated successfully to manager",
      };
    }
  }

  async revertUserRole(user_id: string) {
    let result = (
      await Helper.query(
        `update users set role = 'attendee' where user_id = '${user_id}' AND isDeleted = 0`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to revert role to attendee",
      };
    } else {
      return {
        message: "User user successfully denied managerial previledges",
      };
    }
  }

  async updateAllUsersRoleByAdmin() {
    let result = (
      await Helper.query(
        `update users set isManager = 1 where role = 'manager' AND isDeleted = 0`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve all specified users to manager",
      };
    } else {
      return {
        message: "Users updated successfully to managers",
      };
    }
  }

  async softDeleteUser(user_id: string) {
    let userExists = (
      await Helper.query(
        `select * from users where user_id = '${user_id}' AND isDeleted = 0`
      )
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "The specified user does not exist.",
      };
    }

    let result = (
      await Helper.query(
        `update users set isDeleted = 1 where user_id = '${user_id}'`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to delete the specified user",
      };
    } else {
      return {
        message: "User deleted successfully",
      };
    }
  }

  async retrieveDeletedUser(user_id: string) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "The specified user does not exist.",
      };
    }

    let result = (
      await Helper.query(
        `update users set isDeleted = 0 where user_id = '${user_id}'`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to restore the specified user",
      };
    } else {
      return {
        message: "User restored successfully",
      };
    }
  }

  async retrieveAllDeletedUsers() {
    let result = (
      await Helper.query(`update users set isDeleted = 0 where isDeleted = 1`)
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to restore the specified users",
      };
    } else {
      return {
        message: "All deleted users restored successfully",
      };
    }
  }

  async retrieveAllManagers() {
    let result = (
      await Helper.query(`select * from users where isManager = 1 and isDeleted = 0`)
    ).recordset;

    if (result[0] < 1) {
      return {
        error: "Unable to retrieve managers",
      };
    } else {
      return {
        message: "All managers successfully retrieved",
        managers: result as User[]
      };
    }
  }
}
