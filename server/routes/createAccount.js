var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/create', function (req, res, next) {
    res.locals.connection.query("INSERT INTO user(username, email, password) values('" + req.body.username + "', '" + req.body.email + "', '" + req.body.password + "')", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

router.post('/check', function (req, res, next) {
    res.locals.connection.query("SELECT user_id FROM user WHERE username = '" + req.body.username + "' OR email = '" + req.body.email + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

module.exports = router;
