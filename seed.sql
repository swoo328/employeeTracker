USE employee_tracker_db;

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Information Technology");
INSERT INTO department (name) VALUES ("Accounting and Finance");
INSERT INTO department (name) VALUES ("Human Resource");
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 75000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 110000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Web Developer", 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 90000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Human Resource Specialist", 80000, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tim", "Mckenzie", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jerome", "Griffin", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jackie", "Ford", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rex ", "Fernandez", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("William", "Barrett", 5, 4);