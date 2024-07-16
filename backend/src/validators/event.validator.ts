import joi from 'joi';

export const eventSchema = joi.object({
  event_name: joi.string().alphanum().min(6).max(40).required().messages({
    'string.empty': 'Event name field cannot be empty'
  }),
  short_desc: joi.string().alphanum().min(3).max(16).required().messages({
    'string.empty': 'Please enter the short description',
    'string.max.invalid': 'Short description requires at max 16 charachters'
  }),
  long_desc: joi.string().alphanum().min(3).required().messages({
    'string.empty': 'Long description cannot be empty'
  }),
  location: joi.string().alphanum().min(5).required().messages({
    'string.empty': 'Locaation field cannot be empty'
  }),
  start_date: joi.date().required(),
  end_date: joi.ref('start_date'),
  images: joi.string().alphanum().required(),
  singles: joi.number().required(),
  couple: joi.ref('singles'),
  groups: joi.ref('singles'),
  no_of_tickets: joi.number().required(),
  booking_deadline: joi.ref('start_date')
})