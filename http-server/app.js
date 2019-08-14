var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Database
require('./model/index')
// Access Control list 
require('./acl.js')

//outer
var indexRouter = require('./routes/index');
var carRouter = require('./routes/car');
var driverRouter = require('./routes/drivers');
var logRouter = require('./routes/log');
var categoryRouter = require('./routes/category');
var userRouter = require("./routes/user");
var app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//Config middleware 
var middleware = require('./middleware/middleware');
// Config router
app.use('/', indexRouter);
app.use('/car',middleware.accessControlList(), carRouter);
app.use('/drivers', driverRouter);
app.use('/log', logRouter)
app.use('/category', categoryRouter)
app.use('/user', userRouter)
// Disable e-tag
app.disable('etag')
// Config session
//Config middleware 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
