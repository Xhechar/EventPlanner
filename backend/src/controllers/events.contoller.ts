import { Request, Response } from "express";
import { getIdFromToken } from "../middlewares/getIdFromToken";
import { EventService } from "../services/event.service";
import { eventSchema } from "../validators/event.validator";

const event_service = new EventService()

export class EventsController {

  async createEvent(req: Request, res: Response) {

    try {
      let user_id = getIdFromToken(req);

      if (!user_id) {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }
  
      let { error } = eventSchema.validate(req.body);
  
      if (error) {
        return res.json({
          error: error.message
        })
      }
  
      let response = await event_service.createEvent(user_id, req.body);
  
      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateEvent(req: Request, res: Response) {

    try {
      let user_id = getIdFromToken(req);

      if (!user_id) {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      console.log(user_id);

      let { error } = eventSchema.validate(req.body);

      if (error) {
        return res.status(401).json({error})
      }

      let response = await event_service.updateEvent(req.params.event_id, user_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateEventStatusByAdmin(req: Request, res: Response) {

    try {
      let user_id = getIdFromToken(req);

      if (!user_id) {
        return res.status(501).json({
          error: "Could not get id from token headers"
        })
      }

      let response = await event_service.updateEventStatusByAdmin(user_id ,req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async updateAllEventStatusByAdmin(req: Request, res: Response) {

    try {

      let response = await event_service.updateAllEventStatusByAdmin();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async getEventByEventId(req: Request, res: Response) {

    try {

      let response = await event_service.getEventByEventId(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async getAllEvents(req: Request, res: Response) {

    try {

      let response = await event_service.getAllEvents();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async getAllEventsByDateCreated(req: Request, res: Response) {

    try {

      let response = await event_service.getAllEventsByDateCreated();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

  async deleteEvent(req: Request, res: Response) {

    try {
      console.log(req.params.event_id);
      

      let response = await event_service.deleteEvent(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({error})
    }

  }

}