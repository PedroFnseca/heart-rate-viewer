DROP DATABASE IF EXISTS db_heartHate;

CREATE DATABASE IF NOT EXISTS db_heartHate;

use db_heartHate;

CREATE TABLE tbl_user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password varchar(50) NOT NUll,
  warningheart int(5) DEFAULT 120
);

CREATE TABLE tbl_emergency_contact (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES tbl_user(id)
);

CREATE TABLE tbl_heart (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sensor_id INT NOT NULL,
  rate INT(5) NOT NULL,
  user_id INT NOT NULL,
  datetime datetime default NOW(),
  FOREIGN KEY (user_id) REFERENCES tbl_user(id)
);