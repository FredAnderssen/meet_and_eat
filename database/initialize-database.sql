-- Create a table to store user accounts in.

CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE cards (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	cardTitle VARCHAR(50) NOT NULL,
	CONSTRAINT titleUnique UNIQUE (cardTitle)
);

CREATE TABLE comments (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	comment VARCHAR(150) NOT NULL
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Kevin", "abcd123");
INSERT INTO cards (cardTitle) VALUES ("Kevins card");
INSERT INTO comments (comment) VALUES ("Kevins kommentar");
