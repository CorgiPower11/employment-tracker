require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const inquier = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Database configuration
const dbConfig =   {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: 'employment_DB'
}

// Connect to database
const db = mysql.createConnection(dbConfig,
  console.log(` +++ Connected to ${process.env.DB_NAME}`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
