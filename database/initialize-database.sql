-- Create a table to store user accounts in.

CREATE TABLE accounts (
	accountId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(30) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

CREATE TABLE cards (
	cardId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	accountIdFK INT UNSIGNED,
	cardTitle VARCHAR(50) NOT NULL,
	cardDesc VARCHAR(150) NOT NULL,
	FOREIGN KEY (accountIdFK) REFERENCES accounts(accountId),
	CONSTRAINT titleUnique UNIQUE (cardTitle)
);

CREATE TABLE comments (
	commentId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	cardIdFK INT UNSIGNED,
	comment VARCHAR(150) NOT NULL,
	FOREIGN KEY (cardIdFK) REFERENCES cards(cardId),
	CONSTRAINT commentUnique UNIQUE (comment)
);

