import { v4 } from "uuid";
import { Events, User } from "../interfaces/interfaces";
import { Helper } from "../db_helper/dbhelper";
import mssql from "mssql";
import { sqlConfig } from "../config/config";
import lodash from "lodash";

export class EventService {
  async createEvent(user_id: string, event: Events) {

    let isManager = (await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0 AND isManager = 1`)).recordset;

    if (lodash.isEmpty(isManager)) {
      return {
        error: 'Cannot create event because you are not a manager, yet. Await approval from the admin'
      }
    }

    let pool = await mssql.connect(sqlConfig);
    let event_id = v4();

    let result = (
      await pool
        .request()
        .input("event_id", event_id)
        .input("user_id", user_id)
        .input("event_name", event.event_name)
        .input("short_desc", event.short_desc)
        .input("long_desc", event.long_desc)
        .input("location", event.location)
        .input("start_date", event.start_date)
        .input("end_date", event.end_date)
        .input("images", event.images)
        .input("singles", event.singles)
        .input("couple", event.couple)
        .input("groups", event.groups)
        .input("no_of_tickets", event.no_of_tickets)
        .input("booking_deadline", event.booking_deadline)
        .execute("create_events")
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Failed creating the specified event",
      };
    } else {
      return {
        message: "Event created successfully",
      };
    }
  }

  async updateEvent(event_id: string, user_id: string, event: Events) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0 AND isManager = 1`)
    ).recordset;

    if (lodash.isEmpty(userExists)) {
      return {
        error: "This activity is not authorised, contact event manager.",
      };
    }

    let eventExists = (
      await Helper.query(
        `select * from events where event_id = '${event_id}' AND user_id = '${user_id}'`
      )
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "Event to be updated does not exist",
      };
    }

    let isManager = (await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0 AND isManager = 1`)).recordset;

    if (lodash.isEmpty(isManager)) {
      return {
        error: 'Cannot create event because you are not a manager, yet. Await approval from the admin'
      }
    }

    let pool = mssql.connect(sqlConfig);

    let result = (
      await (await pool)
        .request()
        .input("event_id", eventExists[0].event_id)
        .input("user_id", eventExists[0].user_id)
        .input("event_name", event.event_name)
        .input("short_desc", event.short_desc)
        .input("long_desc", event.long_desc)
        .input("location", event.location)
        .input("start_date", event.start_date)
        .input("end_date", event.end_date)
        .input("images", event.images)
        .input("singles", event.singles)
        .input("couple", event.couple)
        .input("groups", event.groups)
        .input("no_of_tickets", event.no_of_tickets)
        .input("booking_deadline", event.booking_deadline)
        .execute("modify_events")
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to update the specified event",
      };
    } else {
      return {
        message: "Event successfully updated",
      };
    }
  }

  async updateEventStatusByAdmin(user_id: string ,event_id: string) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND role = 'admin' AND isDeleted = 0`)
    ).recordset;

    if (lodash.isEmpty(userExists)) {
      return {
        error: "This activity is not authorised, contact the admin.",
      };
    }

    let eventExists = (
      await Helper.query(`select * from events where event_id = '${event_id}'`)
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "The event specified does not exist",
      };
    }

    let result = (
      await Helper.query(
        `update events set event_status = 'approved' where event_id = '${event_id}'`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve the specified event",
      };
    } else {
      return {
        message: "Event successfully approved for booking",
      };
    }
  }

  async updateAllEventStatusByAdmin() {
    let result = (
      await Helper.query(
        `update events set event_status = 'approved' where event_status = 'pending'`
      )
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve the specified events",
      };
    } else {
      return {
        message: "All events successfully approved for booking",
      };
    }
  }

  async getEventByEventId(event_id: string) {
    let result = (
      await Helper.query(`select * from events where event_id = '${event_id}'`)
    ).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "The event specified does not exist",
      };
    } else {
      return {
        message: "Event successfully retrieved",
        event: result as Events[],
      };
    }
  }

  //used by another function, no end point needed

  async getEventByUserId(user_id: string) {
    let result = (
      await Helper.query(`select * from events where user_id = '${user_id}'`)
    ).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "There are no events available of your id",
      };
    } else {
      return {
        message: "Your events have successfully been retrieved",
        events: result,
      };
    }
  }

  async getAllEvents() {
    let result = (await Helper.query("select * from events where event_status = 'approved'")).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "There are no events created at the moment",
      };
    } else {
      return {
        message: "Events successfully retrieved",
        events: result as Events[],
      };
    }
  }

  async getAllEventsByDateCreated() {
    let required_ids: string[] = [];
    let managers: User[] = [];
    let results = (
      await Helper.query(
        "select * from events where createdAt >= DATEADD(DAY, -10, GETDATE())"
      )
    ).recordset as Events[];

    if (lodash.isEmpty(results)) {
      return {
        error: "There are no events created recently",
      };
    } else {
      for (let result of results) {
        required_ids.push(result.user_id);
      }

      if (required_ids.length == 0) {
        return {
          error: "No events were created by managers recently",
        };
      }
      else {
        for (let required_id of required_ids) {
        
          managers.push(
            (await Helper.query(`select * from users where user_id = '${required_id}'`)).recordset[0] as User
          );
        }
  
        if (managers.length == 0) {
          return {
            error: "No managers were found recently",
          };
        }
  
        else {
          return {
            message: "Recent events successfully retrieved",
            events: results,
            managers: managers
          };
        }
      }
    }
  }

  async deleteEvent(user_id: string, event_id: string) {
    
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0 AND isManager = 1`)
    ).recordset;

    if (lodash.isEmpty(userExists)) {
      return {
        error: "This activity is not authorised, contact event manager.",
      };
    }

    let eventExists = (
      await Helper.query(`select * from events where event_id = '${event_id}'`)
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "The event specified does not exist",
      };
    }

    let result = (
      await Helper.query(`delete from events where event_id = '${event_id}'`)
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to delete the specified event",
      };
    } else {
      return {
        message: "Event successfully deleted",
      };
    }
  }

  //methods required by BookingService

  async increamentBookingTally(event_id: string, ticket_type: string) {
    switch (ticket_type) {
      case "singles": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets + 1, 
          remaining_tickets = no_of_tickets - (booked_tickets + 1) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      };
        break;
      case "couple": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets + 2, 
          remaining_tickets = no_of_tickets - (booked_tickets + 2) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      }
        break;
      case "groups": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets + 5, 
          remaining_tickets = no_of_tickets - (booked_tickets + 5) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      }
        break;
      default: {
        return {
          error: "Invalid ticket type"
        }
      }
    }
  }

  async decrementBookingTally(event_id: string, ticket_type: string) {
    switch (ticket_type) {
      case "singles": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets - 1, 
          remaining_tickets = no_of_tickets - (booked_tickets - 1) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      };
        break;
      case "couple": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets - 2, 
          remaining_tickets = no_of_tickets - (booked_tickets - 2) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      }
        break;
      case "groups": {
        let result = (
          await Helper.query(`update events set booked_tickets = booked_tickets - 5, 
          remaining_tickets = no_of_tickets - (booked_tickets - 5) where event_id = '${event_id}'`)
        ).rowsAffected;

        if (result[0] < 1) {
          return {
            error: "Unable to update bookings of the specified event",
          };
        } else {
          return {
            message: "Booking increament successfully accomplished",
          };
        }
      }
        break;
      default: {
        return {
          error: "Invalid ticket type"
        }
      }
    }
  }
}
