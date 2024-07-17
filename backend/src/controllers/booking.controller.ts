import { Request, Response } from "express";
import { BookingService } from "../services/book.service";
import { getIdFromToken } from "../middlewares/getIdFromToken";


const booking_service = new BookingService();

export class BookingController {

  async createBooking(req: Request, res: Response) {

    try {
      
      let user_id = getIdFromToken(req);

      if(user_id == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await booking_service.createBooking(user_id, req.params.event_id, req.body);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async updateBooking(req: Request, res: Response) {

    try {
      
      let user_id = getIdFromToken(req);

      if(user_id == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await booking_service.updateBooking(req.params.event_id, user_id, req.body);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async deleteBooking(req: Request, res: Response) {

    try {
      
      let user_id = getIdFromToken(req);

      if(user_id == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await booking_service.deleteBooking(user_id, req.params.book_id);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async getAttendeeBookingHistory(req: Request, res: Response) {

    try {
      
      let user_id = getIdFromToken(req);

      if(user_id == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await booking_service.getAttendeeBookingHistory(user_id);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  //manager access

  async getEventUsersBookingHistory(req: Request, res: Response) {

    try {
      
      let user_id = getIdFromToken(req);

      if(user_id == '') {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let result = await booking_service.getEventUsersBookingHistory(user_id);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

  async updateBookStatus(req: Request, res: Response) {

    try {

      let result = await booking_service.updateBookStatus(req.params.book_id);
      
      return res.status(201).json(result);

    } catch (error) {
      return res.json({error})
    }

  }

}