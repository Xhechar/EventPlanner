import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { verifyTokens } from "../middlewares/verifyTokens";

let book_controller = new BookingController();

export const book_route = Router();

book_route.post('/create-booking/:event_id', verifyTokens, book_controller.createBooking);
book_route.put('/update-booking/:event_id', verifyTokens, book_controller.updateBooking);
book_route.delete('/delete-booking/:book_id', verifyTokens, book_controller.deleteBooking);
book_route.get('/get-attendee-booking-history', verifyTokens, book_controller.getAttendeeBookingHistory);
book_route.get('/get-managers-booked-events-users', verifyTokens, book_controller.getEventUsersBookingHistory);
book_route.get('/get-all-bookings', verifyTokens, book_controller.getAllBookings);
book_route.put('/update-booking-status/:book_id', verifyTokens, book_controller.updateBookStatus);