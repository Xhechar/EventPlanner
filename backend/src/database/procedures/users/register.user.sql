CREATE OR ALTER PROCEDURE register_user(
  @user_id VARCHAR(255),
  @fullname VARCHAR(255),
  @phone_number VARCHAR(255),
  @email VARCHAR(255),
  @country VARCHAR(255),
  @address VARCHAR(255),
  @profile_image VARCHAR(255),
  @password VARCHAR(255),
  @role VARCHAR(255)
)
AS
BEGIN
  INSERT INTO users (user_id, fullname, phone_number, email, country, address, profile_image, password, role)
  VALUES(@user_id, @fullname, @phone_number, @email, @country, @address, @profile_image, @password, @role)
END