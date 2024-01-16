var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var recipesRouter = require('./routes/recipes');
<<<<<<< HEAD

=======
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');
>>>>>>> 060c1ba7b4001a0cc447b60225c491833094025c

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
<<<<<<< HEAD

=======
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
>>>>>>> 060c1ba7b4001a0cc447b60225c491833094025c

module.exports = app;
