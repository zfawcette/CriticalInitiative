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



const characters = [];
const users = [];

const addCharacter = ({ userId, roomId, characterId }) => {
    const newCharacter = { userId, roomId, characterId };
    characters.push(newCharacter);
    console.log(newCharacter);
    return { newCharacter };
}

const addUser = ({ userId, roomId, hostFlag }) => {
    const user = { userId, roomId, hostFlag };
    users.push(user);
    console.log(users);
    return { user };
}

const removeCharacter = (userId) => {
    const index = characters.findIndex((character) => characters.userId === userId);

    if (index !== -1) {
        return characters.splice(index, 1)[0];
    }
}

const removeAllCharacters = (roomId) => {
    const chars = characters.filter((character) => characters.roomId === roomId);

    for (var i = 0; i < chars.length; i++) {
        removeCharacter(chars[i]);
    }
}

const removeUser = (userId) => {
    const index = users.findIndex((user) => user.userId === userId);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getCharacter = (userId) => characters.find((character) => character.userId === userId);

const getAllCharactersInRoom = (roomId) => {

    console.log("GETTING ALL CHARACTERS");
    var CharactersToSend = characters.filter((character) => character.roomId === roomId);
    console.log(CharactersToSend);
    return CharactersToSend;

}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);


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

const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({ roomId, hostFlag }, callback) => {
        const { error, user } = addUser({ userId: socket.id, roomId, hostFlag });
        const CharactersToSend = getAllCharactersInRoom(user.roomId);

        if (user) {
            console.log("user exists " + user.userId);
        }

        if (error) return callback(error);

        socket.emit('getCharactersOnJoin', { charactersToAdd: CharactersToSend });

        socket.emit('message', { user: 'admin', text: `${user.userId}, welcome to the room.` });
        socket.broadcast.to(user.roomId).emit('message', { user: 'admin', text: `${user.userId}, has joined` });

        socket.join(user.roomId);
        callback();
    });

    socket.on('newCharacter', ({ newCharacter }) => {
        const user = getUser(socket.id);
        if (user) {
            var initRoll = Math.ceil((Math.random() * 20) + 1);
            newCharacter.initiative = newCharacter.initiative + initRoll;
            const { error, character } = addCharacter({ userId: user.userId, roomId: user.roomId, characterId: newCharacter });

            if (error) return callback(error);

            socket.emit('character', { characterToAdd: newCharacter });
            socket.broadcast.to(user.roomId).emit('character', { characterToAdd: newCharacter });
        } else {
            console.log("user not found");
        }
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log(`${user.userId} has disconnected`);
        if (user && user.hostFlag == 0) {
            const character = getCharacter(user.id);
            if (character) {
                io.to(user.roomId).emit('removeCharacter', { user: user.userId });
            } 
        } else if (user && user.hostFlag == 1) {
            io.to(user.roomId).emit('completeDisconnect');
            removeAllCharacters(user.roomId);
        }
    });
});

server.listen(PORT, function () {
    console.log("The server has started! It is running on PORT: " + PORT);
});
