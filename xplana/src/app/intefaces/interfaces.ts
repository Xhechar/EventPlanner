interface User {
  user_id: string;
  full_name: string;
  phone_number: string;
  email: string;
  country: string;
  profile_image:string,
  address: string;
  isManager: boolean;
  date_created: Date;
  role: string;
  activity: string;
  booked_events_id: string[];
}

interface Events {
  user_id: string;
  event_id: string;
  event_name: string;
  short_description: string;
  long_description: string;
  location: string;
  start_date: Date;
  end_date: Date;
  images: string[];
  booking_price: number;
  booking_deadline_date: Date;
  category: string;
  ticket_type: string;
  no_of_tickets_available: number;
  price_per_group: number;
  event_status: string;
  isApproved: boolean;
}


interface Booking {
  booking_id: string;
  user_id: string;
  event_id: string;
  images: string[];
  event_name: string;
  ticket_type: string;
  book_status: string;
  isCanceled: boolean;
  dateCreated: Date;
  price_paid: number;
}

