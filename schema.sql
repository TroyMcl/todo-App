DROP DATABASE IF EXISTS todos;

CREATE DATABASE todos;

USE todos;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  user varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE todo (
  id int NOT NULL AUTO_INCREMENT,
  task varchar(255) NOT NULL,
  cat varchar(125),
  completed BOOLEAN NOT NULL,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  userID int,
  FOREIGN KEY (userID)
    REFERENCES users(id)
    ON DELETE CASCADE,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
