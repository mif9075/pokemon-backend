var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let cors = require('cors')
let jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var teamsRouter = require('./routes/teams/teams');

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
  .then(()=>{
    console.log('MONGODB CONNECTED')
  })
  .catch((e)=>{
    console.log(`Error: ${e}`)
  })

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/', (req, res, next)=>{
  let token = req.cookies.access_token
try{
  let decoded = jwt.verify(token, process.env.SECRET_KEY)
}
catch(error){
  throw error
}
res.status(200).json(users)
next()
})

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
