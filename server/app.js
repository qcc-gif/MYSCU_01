var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var postRouter = require('./routes/post');
var mineRouter = require('./routes/mine');
var appealRouter = require('./routes/appeal');
var searchRouter = require('./routes/search');
var commentRouter = require('./routes/comment');
var fullRouter = require('./routes/full');
var actionRouter = require('./routes/action');
var messageRouter = require('./routes/message');
var reportRouter = require('./routes/report');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/post', postRouter);
app.use('/mine', mineRouter);
app.use('/appeal', appealRouter);
app.use('/search', searchRouter);
app.use('/comment', commentRouter);
app.use('/full', fullRouter);
app.use('/message', messageRouter);
app.use('/action', actionRouter);
app.use('/report',reportRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {} ;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app
