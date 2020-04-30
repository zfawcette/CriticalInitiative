var express = require('express');
var router = express.Router();

router.get('/getCharacters', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM user_characters", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/loadCharacter', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM user_characters WHERE name = '" + req.body.name + "' AND class = '" + req.body.class + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/loadMonsters', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM default_monsters WHERE name = '" + req.body.name + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/checkRoomId', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM rooms WHERE room_id = '" + req.body.roomId + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/addRoomId', function (req, res, next) {
    res.locals.connection.query("INSERT INTO rooms(room_id) values('" + req.body.roomId + "')", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/removeRoomId', function (req, res, next) {
    res.locals.connection.query("DELETE FROM rooms WHERE room_id ='" + req.body.roomId + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;