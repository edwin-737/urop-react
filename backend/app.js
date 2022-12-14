var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var emailRouter = require('./routes/email');
var optionRouter = require("./routes/option");
var userRouter = require("./routes/user");
var forumPostRouter = require('./routes/forumPost');
var questionRouter = require('./routes/question');
var bulkRouter = require('./routes/bulk');
var chapterRouter = require('./routes/chapter');
// const professorRouter = require("./urop1Tab/routes/professor");
var app = express();
const mongoose = require("mongoose");
var cors = require("cors");
app.use(cors());
app.use(express.json());

const URI = "mongodb+srv://Cluster27837:UHVJdGZWa0Zb@cluster27837.1kv0ktx.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "teams-web-app",
};
mongoose.connect(URI, options);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection initialized successfully");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/email', emailRouter);
app.use('/forumPost', forumPostRouter);
app.use('/option', optionRouter);
app.use('/user', userRouter);
app.use('/bulk', bulkRouter);
app.use('/question', questionRouter);
app.use('/chapter', chapterRouter);
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
