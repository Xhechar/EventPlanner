
CREATE TABLE users(
  user_id VARCHAR(255) PRIMARY KEY NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATE DEFAULT GETDATE(),
  role VARCHAR(255) NOT NULL,
  isManager BIT DEFAULT 0,
  isDeleted BIT  DEFAULT 0,
  isWelcomed BIT DEFAULT 0
)

SELECT * FROM users