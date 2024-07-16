CREATE OR ALTER PROCEDURE create_events(
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
  INSERT INTO events (event_id, user_id, event_name, short_desc, long_desc, location, start_date,
  end_date, images, singles, couple, groups, no_of_tickets, booking_deadline)
  VALUES(@event_id, @user_id, @event_name, @short_desc, @long_desc, @location, @start_date,
  @end_date, @images, @singles, @couple, @groups, @no_of_tickets, @booking_deadline)
END