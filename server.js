const inquirer = require('inquirer');
const mysql = require("mysql"); //createConnection, threadID
const express = require("express");//port app.get app.listen

const PORT = 3000;

const app = express();

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
const startQuestions = () => {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What do you want to do right now?",
            choices: [
                "View all the departments",
                "View all the roles",
                "View all the employees"
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
                default:
                    connection.end();
                    break;
            }
        });
}
const viewEmployees = () => {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        startQuestions();
    });
};
const viewDepartments = () => {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        startQuestions();
    });
};
const viewRoles = () => {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.table(data);
        startQuestions();
    });
};
//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is listening!! http://localhost:" + PORT);
});