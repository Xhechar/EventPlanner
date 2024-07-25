CREATE OR ALTER PROCEDURE modify_user(
  @user_id VARCHAR(255),
  @fullname VARCHAR(255),
  @phone_number VARCHAR(255),
  @email VARCHAR(255),
  @country VARCHAR(255),
  @address VARCHAR(255),
  @profile_image VARCHAR(255),
  @role VARCHAR(255)
)
AS
BEGIN
  UPDATE users SET user_id = @user_id, fullname = @fullname, phone_number = @phone_number,
  email = @email, country = @country, address = @address, profile_image = @profile_image, role = @role WHERE user_id = @user_id
END