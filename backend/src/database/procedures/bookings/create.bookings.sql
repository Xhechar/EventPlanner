CREATE OR ALTER PROCEDURE create_booking (
  @book_id VARCHAR(255),
  @event_id VARCHAR(255),
  @user_id VARCHAR(255),
  @ticket_type VARCHAR(255)
)
AS
BEGIN
  INSERT INTO bookings (book_id, event_id, user_id, ticket_type)
  VALUES(@book_id, @event_id, @user_id, @ticket_type)
END