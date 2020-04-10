var express = require('express');
var router = express.Router();

router.post('/checkRoomId', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM rooms WHERE room_id = '" + req.body.roomId + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        console.log(results[0] + " " + results[1]);
    })
});

router.post('/addRoomId', function (req, res, next) {
    res.locals.connection.query("INSERT INTO rooms(room_id) values('" + req.body.roomId + "')", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

module.exports = router;