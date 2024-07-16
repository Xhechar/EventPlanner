CREATE OR ALTER PROCEDURE modify_events(
  @event_id VARCHAR(255),
  @user_id VARCHAR(255),
  @event_name VARCHAR(255),
  @short_desc VARCHAR(255),
  @long_desc VARCHAR(255),
  @location VARCHAR(255),
  @start_date DATE,
  @end_date DATE,
  @images NVARCHAR(MAX),
  @singles INT,
  @couple INT,
  @groups INT,
  @no_of_tickets INT,
  @booking_deadline DATE
)
AS
BEGIN
  UPDATE events SET event_id = @event_id, user_id = @user_id, event_name = @event_name,
  short_desc = @short_desc, long_desc = @long_desc, location = @location, start_date =@start_date,
  end_date = @end_date, images = @images, singles = @singles, couple = @couple, groups = @groups,
  no_of_tickets = @no_of_tickets, booking_deadline = @booking_deadline WHERE (event_id = @event_id AND user_id = @user_id)
END