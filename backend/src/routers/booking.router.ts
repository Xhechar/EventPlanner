import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { verifyTokens } from "../middlewares/verifyTokens";

let book_controller = new BookingController();

export const book_route = Router();

book_route.post('/create-booking/:event_id', verifyTokens, book_controller.createBooking);
book_route.put('/update-booking/event_id', verifyTokens, book_controller.updateBooking);