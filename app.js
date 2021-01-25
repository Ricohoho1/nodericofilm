var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Database
var mongo = require('mongodb');
//20200124
var MongoClient = require('mongodb').MongoClient; 
var monk = require('monk');
var db = monk('localhost:27017/ricofilm');
//var db = monk('mongodb://myUserAdmin:rineka5993@localhost:27017/ricofilm');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');
var resquestRouter = require('./routes/request');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/ricofilm', express.static('public'));
app.use('/ricofilm', express.static(__dirname + '/public'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/request', resquestRouter);

app.use('/ricofilm/', indexRouter);
app.use('/ricofilm/users', usersRouter);
app.use('/ricofilm/films', filmsRouter);
app.use('/ricofilm/request', resquestRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
