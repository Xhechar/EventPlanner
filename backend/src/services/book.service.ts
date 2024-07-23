import { v4 } from "uuid";
import { Helper } from "../db_helper/dbhelper";
import { Book, Events, User } from "../interfaces/interfaces";
import lodash from "lodash";
import { EventService } from "./event.service";
import { UserService } from "./user.service";

let event_service = new EventService();
let user_service = new UserService();

export class BookingService {
  async createBooking(user_id: string, event_id: string, booking: Book) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Booking this event is not authorised",
      };
    }

    let eventExists = (
      await Helper.query(`select * from events where event_id = '${event_id}'`)
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "Event to be booked does not exist",
      };
    }

    let result = (
      await Helper.execute("create_booking", {
        book_id: v4(),
        event_id: event_id,
        user_id: user_id,
        ticket_type: booking.ticket_type,
      })
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to complete booking",
      };
    } else {
      let decider = await event_service.increamentBookingTally(
        event_id,
        booking.ticket_type
      );

      if (decider.error) {
        return {
          error: "Unable to create booking of the specified event",
        };
      } else {
        return {
          message:
            "Booking submitted successfully await email confirmation on approval",
        };
      }
    }
  }

  async updateBooking(book_id: string, user_id: string, booking: Book) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Updating this event is not authorised",
      };
    }

    let bookingExists = (
      await Helper.query(
        `select * from bookings where book_id = '${book_id}' AND user_id = '${user_id}' AND book_status = 0`
      )
    ).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "Booking not found",
      };
    }

    let removeExistingTally = await event_service.decrementBookingTally(
      bookingExists[0].event_id,
      bookingExists[0].ticket_type
    );

    if (removeExistingTally.error) {
      return {
        error: removeExistingTally.error,
      };
    }

    let result = (
      await Helper.execute("modify_booking", {
        book_id: bookingExists[0].book_id,
        event_id: bookingExists[0].event_id,
        user_id: bookingExists[0].user_id,
        ticket_type: booking.ticket_type,
      })
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to complete booking update",
      };
    } else {
      let decider = await event_service.increamentBookingTally(
        bookingExists[0].event_id,
        booking.ticket_type
      );

      if (decider.error) {
        return {
          error: decider.error,
        };
      } else {
        return {
          message: decider.message,
        };
      }
    }
  }

  async deleteBooking(user_id: string, book_id: string) {
    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Deleting this booking is not authorised",
      };
    }

    let bookingExists = (
      await Helper.query(
        `select * from bookings where book_id = '${book_id}' AND user_id = '${user_id}'`
      )
    ).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "Booking to be deleted does not exist",
      };
    }
    {
      let result = (
        await Helper.query(`delete from bookings where book_id = '${book_id}'`)
      ).rowsAffected;

      if (result[0] < 1) {
        return {
          error: "Unable to complete booking deletion",
        };
      } else {
        let removeExistingTally = await event_service.decrementBookingTally(
          bookingExists[0].event_id,
          bookingExists[0].ticket_type
        );

        if (removeExistingTally.error) {
          return {
            error:
              "Booking deleted successfully but unable to update change tally of events",
          };
        }
        return {
          message: "Booking deleted successfully and events tally updated",
        };
      }
    }
  }

  //fetching the events, that are booked by a specific user(Booking history service)

  async getAttendeeBookingHistory(user_id: string) {
    let event_ids: string[] = [];
    let fetchedEvents: Events[] = [];

    let userExists = (
      await Helper.query(`select * from users where user_id = '${user_id}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Deleting this booking is not authorised",
      };
    }

    let eventsAvailable = (
      await Helper.query(`select * from bookings where user_id = '${user_id}'`)
    ).recordset;

    if (lodash.isEmpty(eventsAvailable)) {
      return {
        error: "No bookings currently available under your name",
      };
    } else {
      for (let event of eventsAvailable) {
        event_ids.push(event.event_id);
      }

      if (event_ids.length == 0) {
        return {
          error: "Unable to display events for this user",
        };
      } else {
        for (let user_event_id of event_ids) {
          let retrievedEvent = await event_service.getEventByEventId(
            user_event_id
          );

          if (retrievedEvent.event) {
            fetchedEvents.push(retrievedEvent.event[0] as unknown as Events);
          } else {
            return {
              error: retrievedEvent.error,
            };
          }
        }

        if (fetchedEvents.length == 0) {
          return {
            error: "Unable to display the events retrieved.",
          };
        } else {
          return {
            message: "Events successfully retrieved",
            events: fetchedEvents,
          };
        }
      }
    }
  }

  //fetching all the users who have booked a managers event >> Attendee Dashboard

  async getEventUsersBookingHistory(manager_id: string) {
    let user_ids: string[] = [];
    let event_ids: string[] = [];
    let fetchedUsers: User[] = [];

    let userExists = (
      await Helper.query(`select * from users where user_id = '${manager_id}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Getting users booked to this event is not authorised",
      };
    }

    let eventsCreated = await event_service.getEventByUserId(manager_id);

    if (eventsCreated.error) {
      return {
        error: eventsCreated.error,
      };
    } else if (eventsCreated.events) {
      let createdEvents = eventsCreated.events as Events[];

      for (let createdEvent of createdEvents) {
        event_ids.push(createdEvent.event_id);
      }

      if(event_ids.length == 0 ) {
        return {
          error: "Unable to get events for the specified manager to get the users history"
        }
      }

      else {
        for (let event_id of event_ids) {
          let bookingsAvailable = (await Helper.query(
            `select * from bookings where event_id = '${event_id}'`
          )).recordset;

          if (lodash.isEmpty(bookingsAvailable)) {
            continue;
          }
          else {
            for (let booking of bookingsAvailable as User[]) {
              user_ids.push(booking.user_id);
            }
          }

          if (user_ids.length == 0) {
            return {
              error: "Unable to display users for this event",
            };
          }
          else {
            for (let user_id of user_ids) {
              let retrievedUser = await user_service.getUserById(user_id);

              if(retrievedUser.error) {
                return {
                  error: "The history of the user does not exist."
                }
                break;
              }
              else if (retrievedUser.user) {
                fetchedUsers.push(retrievedUser.user[0] as unknown as User);
              }
            }

            if (fetchedUsers.length == 0) {
              return {
                error: "Unable to display the users retrieved.",
              };
            }
            else {
              return {
                message: "Users successfully retrieved",
                users: fetchedUsers,
              };
            }
          }
        }
      }
    }
  }


  async updateBookStatus(book_id: string) {

    let bookingExists = (await Helper.query(`select * from bookings where book_id = '${book_id}'`)).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "Booking to be approved does not exist"
      }
    }

    let result = (await Helper.query(`update bookings set book_status = 1 where book_id = '${book_id}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve booking"
      }
    }

    else {
      return {
        message: "Booking approved successfully"
      }  
    }
  }

  async getAllBookings() {
    let result = (await Helper.query('select * from bookings')).recordset;

    if (lodash.isEmpty(result)) {
      return {
        error: "No bookings currently found"
      }
    }
    else {
      return {
        message: "Bookings successfully retrieved",
        bookings: result
      }
    }
  }
}
