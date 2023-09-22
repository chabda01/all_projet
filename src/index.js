//const express = require('express');
var bcrypt = require('bcryptjs');
const app = express();
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
//app.use(express.raw());
const port = 3000;
require('dotenv').config();
require('./routes/auth/auth')(app, bcrypt);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})