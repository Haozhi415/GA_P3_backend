var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var recipesRouter = require('./routes/recipes');
// var usersRouter = require('./routes/users');
<<<<<<< HEAD
=======
var reviewsRouter = require('./routes/reviews');
>>>>>>> 5e2725d08115c11b02b3cbb74eefb6c0e59d16a5

require("dotenv").config();
require("./client/mongo");

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/recipes', recipesRouter);
// app.use('/users', usersRouter);
<<<<<<< HEAD
=======
app.use('/reviews', reviewsRouter);
>>>>>>> 5e2725d08115c11b02b3cbb74eefb6c0e59d16a5

module.exports = app;
