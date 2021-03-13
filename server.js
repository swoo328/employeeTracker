const inquirer = require('inquirer');
const mysql = require("mysql"); //createConnection, threadID
const express = require("express");//port app.get app.listen

const PORT = 3000;

const app = express();

//connection to the server
const connection = mysql.createConnection({
    "host": "localhost",
    "user": "swoo328",
    "password": "progery68",
    "port": 3306,
    "database": "employee_tracker_db"
});

app.get("/", (req, res) => {
    res.send("word");
});


connection.connect(() => {
    console.log("Connected");
    startQuestions();
});

//starting questions
const startQuestions = () => {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What do you want to do right now?",
            choices: [
                "View all the departments",
                "View all the roles",
                "View all the employees",
                "Add an employee",
                "Add a role",
                "Add a department",
                "Update employee role",
                "Exit"
            ]
        }).then(answer => {
            switch (answer.choice) {
                case "View all the departments":
                    viewDepartments();
                    break;
                case "View all the roles":
                    viewRoles();
                    break;
                case "View all the employees":
                    viewEmployees();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Update employee role":
                    updateEmployee();
                default:
                    connection.end();
                    console.log("Have a Nice Day");
                    break;
            }
        });
}
//view the employees in the table
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        //displays the table
        console.table(data);
        startQuestions();
    });
};
//view the departments in the table
const viewDepartments = () => {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        //displays the table
        console.table(data);
        startQuestions();
    });
};
//view the roles in the table
const viewRoles = () => {
    //(err,res) also works
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        //displays the table
        console.table(data);
        startQuestions();
    });
};
//adding a role to the table
const addRole = () => {
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "Enter the role name:"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "What is the salary for the new role?"
            }

        ]).then(res => {
            let role = res.role;
            let roleSalary = res.roleSalary;
            // let department = res.department;
            connection.query("SELECT * FROM department", async (err, res) => {
                if (err) throw err;
                const departmentChoices = res.map(({ id, name }) => ({
                    name: name,
                    value: id
                }))
                console.log(departmentChoices);
                const addDept = await inquirer.prompt([
                    {
                        name: "department",
                        type: "list",
                        message: "Which department would like to add to the role?",
                        choices: departmentChoices
                    }
                ])
                connection.query("INSERT INTO role SET?", {
                    title: role,
                    salary: roleSalary,
                    department_id: addDept.department
                }, function (err, res) {
                    if (err) throw err;
                    console.log("Role is added");
                    startQuestions();
                });
            });

        });

};
//adding a department to the table
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter Department Name"
        },
    ]).then((res) => {
        let department = res.department;
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: department
            },
            function (err, res) {
                if (err) throw err;
                console.log("successfully added Department");
                startQuestions();
            });
    });
};
//add an employee to the table
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            message: "What is the employee's first name?",
            type: "input"
        },
        {
            name: "lastName",
            message: "What is the employee's last name",
            type: "input"
        }
    ]).then(res => {
        let firstName = res.firstName;
        let lastName = res.lastName;
        connection.query("SELECT * FROM role", async (err, res) => {
            if (err) throw err;
            const roleChoices = res.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            console.log(roleChoices);
            const addRole = await inquirer.prompt([
                {
                    name: "role",
                    type: "list",
                    message: "Which role would you like to add?",
                    choices: roleChoices
                }
            ])
            connection.query("INSERT INTO employee SET?", {
                first_name: firstName,
                last_name: lastName,
                role_id: addRole.role
            }, function (err, res) {
                if (err) throw err;
                console.log("Employee is added");
                startQuestions();
            });

        })
    })
};

const updateEmployee = () => {

}
//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is listening!! http://localhost:" + PORT);
});