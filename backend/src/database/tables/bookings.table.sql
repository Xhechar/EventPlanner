
CREATE TABLE bookings (
  book_id VARCHAR(255) PRIMARY KEY NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  ticket_type VARCHAR(255) NOT NULL,
  book_status BIT DEFAULT 0,
  isCancelled BIT DEFAULT 0,
  createdAt DATE DEFAULT GETDATE(),
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)

SELECT * FROM bookings