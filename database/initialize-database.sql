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
	cardTitle VARCHAR(50) NOT NULL,
	cardDesc VARCHAR(150) NOT NULL,
	cardDate VARCHAR(100) NOT NULL,
	idAccountFK INT UNSIGNED,
	FOREIGN KEY (idAccountFK) REFERENCES accounts(accountId),
	CONSTRAINT titleUnique UNIQUE (cardTitle)
);

CREATE TABLE comments (
	commentId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	comment VARCHAR(150) NOT NULL,
	idAccFK INT UNSIGNED,
	FOREIGN KEY (idAccFK) REFERENCES accounts(accountId),
	CONSTRAINT commentUnique UNIQUE (comment)
);

-- Create a dummy account for testing.

INSERT INTO accounts (email, username, password) VALUES ("kevin.test@hotmail.com", "Kevin", "abcd123");


INSERT INTO comments (comment) VALUES ("Kevins kommentar");
/*
INSERT INTO cards (cardTitle, cardDesc, cardDate, cardAuthor) VALUES ("Kevins card", "Want to eat lucnh with me?", "05-02-2019", );
INSERT INTO cards (cardTitle, cardDesc, cardDate) VALUES ("Olles card", "Want to eat lucnh with me?", "05-02-2019");
INSERT INTO cards (cardTitle, cardDesc, cardDate) VALUES ("Pods card", "Want to eat?", "05-02-2019");
INSERT INTO cards (cardTitle, cardDesc, cardDate) VALUES ("Berit card", "Want to eat with me?", "05-02-2018");
INSERT INTO cards (cardTitle, cardDesc, cardDate) VALUES ("Kalle card", "Want with me?", "05-02-2019");
*/

-- INSERT INTO cards (cardTitle, cardDesc, cardDate, cardAuthor) VALUES ("Kevins card?", "Want to eat lucnh with me?", "05-02-2019", (select username from accounts where username = 'Kevin'));
INSERT INTO cards (cardTitle, cardDesc, cardDate, idAccountFK) \
 VALUES ('Kevins kort', 'Description', 'Datum', (SELECT accountId FROM accounts WHERE username = 'Kevin'));


/*
	insert into "order" (customer_id, price) values \
((select customer_id from customer where name = 'John'), 12.34);
*/
