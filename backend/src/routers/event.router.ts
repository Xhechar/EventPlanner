import { Router } from "express";
import { EventsController } from "../controllers/events.contoller";
import { verifyTokens } from "../middlewares/verifyTokens";

const event_controller = new EventsController();

export const events_route = Router();



events_route.post('/create-event', verifyTokens, event_controller.createEvent);
events_route.put('/update-event/:event_id', verifyTokens, event_controller.updateEvent);
events_route.get('/get-all-events', verifyTokens, event_controller.getAllEvents);
events_route.put('/update-event-status/:event_id', verifyTokens, event_controller.updateEventStatusByAdmin);
events_route.get('/get-event-by-user-id', verifyTokens, event_controller.getEventByUserId)
events_route.put('/update-all-event-status', verifyTokens, event_controller.updateAllEventStatusByAdmin);
events_route.get('/get-event-by-id/:event_id', verifyTokens, event_controller.getEventByEventId);
events_route.get('/get-events-by-date-created', verifyTokens, event_controller.getAllEventsByDateCreated);
events_route.delete('/delete-event/:event_id', verifyTokens, event_controller.deleteEvent);
events_route.get('/get-all-pending-events', verifyTokens, event_controller.getAllPendingEvents);