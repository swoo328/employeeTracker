const mysql = require("mysql"); //createConnection, threadID
const express = require("express");//port app.get app.listen

const PORT = 3000;

const app = express();

const connection = mysql.createConnection({
    "host": "localhost",
    "user": "swoo328",
    "password": "progery68",
    "port": 3306,
    "database": "wishes_db"
});

app.get("/" , (req,res)=>{
    res.send("word");
});

connection.connect(() => {
    console.log("connected at " + connection.threadId);
});

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is listening ..... word ... http://localhost:" + PORT);
});