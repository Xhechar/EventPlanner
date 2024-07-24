export interface User {
  user_id: string,
  fullname: string,
  phone_number: string,
  email: string,
  country: string,
  address: string,
  profile_image: string,
  password: string,
  createdAt: string,
  role: string
}

export interface Events {
  event_id: string,
  user_id: string,
  event_name: string,
  short_desc: string,
  long_desc: string,
  location: string,
  start_date: string,
  end_date: string,
  images: string[],
  singles: number,
  couple: number,
  groups: number,
  no_of_tickets: number,
  booked_tickets: number,
  remaining_tickets: number,
  booking_deadline: string,
  event_status: string
}

export interface Book {
  book_id: string,
  event_id: string,
  user_id: string,
  ticket_type: string,
  book_status: boolean,
  isCancelled: boolean,
  createdAt: string
}

export interface Logins {
  email: string,
  password: string
}

export interface TokenInfo {
  user_id: string,
  fullname: string,
  phone_number: string,
  email: string,
  country: string,
  address: string,
  profile_image: string,
  password: string,
  role: string
}

export interface MailConfigurations {
  service: string,
  host: string,
  port: number,
  requireTLS: boolean,
  auth: {
    user: string,
    pass: string
  }
}

export interface MessageOptions {
  from: string,
  to: string,
  subject: string,
  html: string
}