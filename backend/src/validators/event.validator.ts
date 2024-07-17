import joi from 'joi';

export const eventSchema = joi.object({
  event_name: joi.string().min(6).max(40).required().messages({
    'string.empty': 'Event name field cannot be empty'
  }),
  short_desc: joi.string().min(3).required().messages({
    'string.empty': 'Please enter the short description',
    'string.max': 'Short description requires at max 30 charachters'
  }),
  long_desc: joi.string().min(3).required().messages({
    'string.empty': 'Long description cannot be empty'
  }),
  location: joi.string().min(5).required().messages({
    'string.empty': 'Locaation field cannot be empty'
  }),
  start_date: joi.date().required(),
  end_date: joi.date().required(),
  images: joi.string().required(),
  singles: joi.number().required(),
  couple: joi.number().required(),
  groups: joi.number().required(),
  no_of_tickets: joi.number().required(),
  booking_deadline: joi.date().required()
})