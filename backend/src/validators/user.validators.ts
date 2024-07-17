import joi from 'joi';

export const userSchema = joi.object({
  fullname: joi.string().min(5).max(30).required().messages({
    'string.empty': 'The fullname field provided cannot be empty',
    'string.min.base': 'The minimum characters for fullnames should be greater than 5'
  }),
  phone_number: joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
    'string.empty': 'Phone number field cannot be empty',
    'string.pattern.base': 'The phone number value provided should only be of type number and made of 10 characters'
  }),
  email: joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email.invalid': 'Please enter a valid email'
  }),
  country: joi.string().min(3).max(30).required().messages({
    'string.empty': 'Please provide value for country'
  }),
  address: joi.string().min(5).max(40).required().messages({
    'string.empty': 'Please enter value in address field, 5 charachers or more'
  }),
  profile_image: joi.string().required().messages({
    'string.required': 'profile image field cannot be empty'
  }),
  password: joi.string(),
  role: joi.string().required()
});