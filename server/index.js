const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const db = mysql.createPool({
    database: "zuna_task", //databaseName
    host: "localhost", //hostName
    user: "root", //userName
    password: "",
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Connected")
})

app.get("/api/getAllUsers", (req, res) => {
    const sqlQuery = `SELECT * FROM zuna_task_users`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err, "error");
        } if (response) {
            res.send(response);
            console.log(response, "response");
        }
    })
})

app.post("/api/getUser", (req, res) => {
    const { email } = req.body;
    const sqlQuery = `SELECT * FROM zuna_task_users WHERE email="${email}"`;
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err, "error");
        } else {
            res.send(response);
            console.log(response, "response");
        }
    })
})

app.post("/api/addUser", (req, res) => {
    const { email, username, password } = req.body;
    const sqlQuery = "INSERT INTO zuna_task_users (email, username, password) VALUES (?, ?, ?)";
    db.query(sqlQuery, [email, username, password], (err, response) => {
        if (err) {
            console.log("error");
        } if (response) {
            console.log(response.affectedRows, "response");
            if (response.affectedRows > 0) {
                res.status(201).send("SUCCESS");
            } else if (response.affectedRows === 0) {
                res.status(500).send("SUCCESS");
            }
        }
    })
})

app.post("/api/addTask", (req, res) => {
    const { task, id } = req.body;
    const sqlQuery = "INSERT INTO zuna_tasks_list (task_name, created_user) VALUES (?, ?)"
    db.query(sqlQuery, [task, id], (err, response) => {
        if (err) {
            console.log(err, "error");
        } if (response) {
            console.log(response.affectedRows, "response");
            if (response.affectedRows > 0) {
                res.status(201).send("SUCCESS");
            } else if (response.affectedRows === 0) {
                res.status(500).send("SUCCESS");
            }
        }
    })
})

app.post("/api/getTasksById", (req, res) => {
    const { id } = req.body;
    const sqlQuery = `SELECT * FROM zuna_tasks_list WHERE created_user="${id}"`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err, "error");
        } if (response) {
            console.log(response, "response");
            res.send(response);
        }
    })
})

app.post("/api/deleteTaskById", (req, res) => {
    const { id } = req.body;
    const sqlQuery = `DELETE FROM zuna_tasks_list WHERE id="${id}"`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err, "error");
        } if (response) {
            console.log(response.affectedRows, "response");
            if (response.affectedRows > 0) {
                res.status(201).send("SUCCESS");
            } else if (response.affectedRows === 0) {
                res.status(500).send("SUCCESS");
            }
        }
    })
})

app.listen(5000, () => console.log("Server running on port 5000"));