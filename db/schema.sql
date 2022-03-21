DROP DATABASE IF EXISTS employment_db;
CREATE DATABASE employment_db;

USE employment_db;

CREATE TABLE department(
  id INTEGER NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INTEGER NOT NULL,
  title VARCHAR(30) NOT NULL
  salary DECIMAL(10, 2) NOT NULL
  department_id INTEGER NOT NULL
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employee(
  id INTEGER NOT NULL,
  first_name VARCHAR(30) NOT NULL
  last_name VARCHAR(30) NOT NULL
  role_id INTEGER NOT NULL
  manager_id INTEGER
    FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);
