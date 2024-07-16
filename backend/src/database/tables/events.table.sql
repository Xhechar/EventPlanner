CREATE TABLE events(
  event_id VARCHAR(255) PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  short_desc VARCHAR(255) NOT NULL,
  long_desc VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  images NVARCHAR(MAX) NOT NULL,
  singles INT,
  couple INT,
  groups INT,
  no_of_tickets INT,
  booked_tickets INT DEFAULT 0,
  remaining_tickets INT,
  booking_deadline DATE,
  event_status VARCHAR(255) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)

SELECT * FROM events

ALTER TABLE events ADD createdAt DATE DEFAULT GETDATE()