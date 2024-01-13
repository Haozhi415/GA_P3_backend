var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var recipesRouter = require('./routes/recipes');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');

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
app.use('/reviews', reviewsRouter);

module.exports = app;
