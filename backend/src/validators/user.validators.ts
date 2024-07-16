import joi from 'joi';

export const userSchema = joi.object({
  fullname: joi.string().alphanum().min(5).max(30).required().messages({
    'string.empty': 'The fullname to e provided cannot be empty',
    'string.min.base': 'The minimum characters for fullnames should be greater than 5'
  }),
  phone_number: joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
    'string.empty': 'Phone number field cannot be empty',
    'string.pattern.base': 'The value provided should only be of type number and made of 10 characters'
  }),
  email: joi.string().alphanum().email().required().messages({
    'string.empty': 'Email is required',
    'string.email.invalid': 'Please enter a valid email'
  }),
  country: joi.string().min(3).max(30).required().messages({
    'string.empty': 'Please provide value for country'
  }),
  address: joi.string().alphanum().min(5).max(40).required().messages({
    'string.empty': 'Please enter value in address field, 5 charachers or more'
  }),
  profile_image: joi.string().alphanum(),
  password: joi.string().alphanum().required().pattern(new RegExp('^[A-Za-z0-9]{8, 30}$')).messages({
    'string.empty': 'Please enter password it the provided area',
    'string.pattern.base': 'The password should contain a min 0f 8 charachters including numbers and letters'
  }),
  role: joi.string().required()
});