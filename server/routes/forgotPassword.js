var express = require('express');
var router = express.Router();

router.post('/checkEmail', function (req, res, next) {
    res.locals.connection.query("SELECT email, password FROM user WHERE username = '" + req.body.input + "' OR email = '" + req.body.input + "'", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

module.exports = router;