require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createAccountRouter = require('./routes/createAccount');
var forgotPasswordRouter = require('./routes/forgotPassword');
var roomRouter = require('./routes/room');

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3306

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var mysql = require("mysql");
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'www.math-cs.ucmo.edu',
        user: 'S20criticalinit',
        password: 'S20tinilacitirc',
        database: 'S20criticalinit'
    });
    res.locals.connection.connect();
    next();
})

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "CriticalInitiativeSpring2020@gmail.com",
        pass: "Spring2020"
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createAccount', createAccountRouter);
app.use('/forgotPassword', forgotPasswordRouter);
app.use('/room', roomRouter);

app.post('/email', (req, res) => {

    console.log(req.body[0].email);

    let mailOptions = {
        from: "CriticalInitiativeSpring2020@gmail.com",
        to: req.body[0].email,
        subject: 'Critical Initiative - Your Password',
        text: 'Your password is ' + req.body[0].password
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('sent');
        }
    })
});

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

const http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log("a user has connected");
    socket.on('playerEntered', function (data) {
        io.emit("new-remote-operations", data);
    });
});

http.listen(PORT, function () {
    console.log("The server has started! It is running on PORT: " + PORT);
});
