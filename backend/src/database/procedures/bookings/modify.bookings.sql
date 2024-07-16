CREATE OR ALTER PROCEDURE modify_booking (
  @book_id VARCHAR(255),
  @event_id VARCHAR(255),
  @user_id VARCHAR(255),
  @ticket_type VARCHAR(255)
)
AS
BEGIN
  UPDATE bookings SET book_id = @book_id, event_id = @event_id, user_id = @user_id, ticket_type = @ticket_type
  WHERE book_id = @book_id;
END