var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var allowedOrigins = ["http://localhost:3000", 'http://localhost:3001'];


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var questionsRouter = require('./routes/questionRoutes');
var quizRouter = require('./routes/quizRoutes');

var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/trivia-quiz';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Error while connectiong to the database"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin )=== -1){
      var msg = "The CORS policy does not allow access from the spesified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

var session = require('express-session');
var MongoStore = require('connect-mongo');
const { log } = require('console');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: mongoDB})
}));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/quiz', quizRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(res.locals.error);
});
app.listen(3001, function(){
  console.log("Server started in port 3001");
})

module.exports = app;
