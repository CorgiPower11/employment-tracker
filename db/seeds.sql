INSERT INTO department (department_name)
VALUES 
  ("Accounting"),
  ("HR"),
  ("Sales"),
  ("Marketing"),
  ("Production");

SELECT * FROM DEPARTMENT;

INSERT INTO roles (title, salary, department_id)
VALUES 
  ("Accountant", 80000, 1),
  ("HR Director", 75000, 2),
  ("Machine Operator", 50000, 3),
  ("Sales Representive", 65000, 4),
  ("Marketing Manager", 70000, 5);

  SELECT * FROM ROLE;

INSERT INTO categories (first_name, last_name, role_id, manager_id) 
VALUES
  ("Jon", "Doe", 1, NULL),
  ("Jane", "Doe", 2, NULL),
  ("Richard", "James", 3, 4),
  ("Emma", "Lee", 4, 1),
  ("Maya", "Xiong", 5, 2),
  ("Tou", "Moua", 3, 3),
  ("Maria", "Lopez", 3, 1);

SELECT * FROM employee;