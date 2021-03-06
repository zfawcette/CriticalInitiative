var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.locals.connection.query("SELECT * FROM user", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    console.log('---- login api --', req.body);
    res.locals.connection.query("SELECT * FROM user where username ='" + username + "' and password ='" + password + "'", function (error, results, fields) {
        if (error) {
            console.log('---- error is ---', error)
            throw error;
        }
        console.log('---- repsonse ----', results);
        res.status(200).send(JSON.stringify(results));
    });
})

router.post('/getCharacter', function (req, res, next) {
    const { user_id } = req.body;
    console.log('---- get character api --', req.body);
    res.locals.connection.query(`SELECT * FROM user_characters where owner_id = ${user_id}`, function (error, results, fields) {
        if (error) {
            console.log('---- error is ---', error)
            throw error;
        }
        console.log('---- repsonse ----', results);
        res.status(200).send(JSON.stringify(results));
    });
})

router.post('/getCharacterById', function (req, res, next) {
    const { user_id, character_id } = req.body;
    res.locals.connection.query(`SELECT * FROM user_characters where owner_id = ${user_id} and character_id = ${character_id}`, function (error, results, fields) {
        if (error) {
            console.log('---- error is ---', error)
            throw error;
        }
        console.log('---- repsonse ----', results);
        res.status(200).send(JSON.stringify(results));
    });
})

router.post('/updateCharacter', function (req, res, next) {
    const {
        userId,
        character_id,
        name,
        level,
        pclass,
        race,
        current_hp,
        max_hp,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        armor_class,
        initiative,
        speed,
        alignment,
        experience
    } = req.body;
    console.log('---- character api --', req.body);

    res.locals.connection.query("SELECT * FROM user_characters where owner_id ='" + userId + "'", function (error, results, fields) {
        if (error) {
            console.log('---- error is ---', error)
            throw error;
        }

        if (results.length > 0) { // update character
            res.locals.connection.query(`update user_characters
                SET
                name= ?,
                level= ?,
                class= ?,
                race= ?,
                current_hp= ?,
                max_hp= ?,
                strength= ?,
                dexterity= ?,
                constitution= ?,
                intelligence= ?,
                wisdom= ?,
                charisma= ?,
                armor_class= ?,
                initiative= ?,
                speed= ?,
                alignment= ?,
                experience= ?
                where owner_id= ? and character_id = ?`, [name, level, pclass, race, current_hp, max_hp,
                    strength, dexterity, constitution,
                    intelligence, wisdom, charisma, armor_class, initiative, speed,
                    alignment, experience, userId, character_id], function (error, results, fields) {
                        if (error) {
                            console.log('---- error is ---', error)
                            throw error;
                        }
                        console.log('---- repsonse ----', results);
                        res.status(200).send(JSON.stringify(results));
                    });
        } else {  // insert character

        }
        // console.log('---- repsonse ----', results);
        // res.status(200).send(JSON.stringify(results));
    });
})

router.post('/createCharacter', function (req, res, next) {
    const {
        userId,
        character_id,
        name,
        level,
        pclass,
        race,
        current_hp,
        max_hp,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        armor_class,
        initiative,
        speed,
        alignment,
        experience
    } = req.body;
    console.log('---- character api --', req.body);

    res.locals.connection.query(`insert into user_characters(
                name,
                level,
                class,
                race,
                current_hp,
                max_hp,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
                armor_class,
                initiative,
                speed,
                alignment,
                experience, owner_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [name, level, pclass, race, current_hp, max_hp,
            strength, dexterity, constitution,
            intelligence, wisdom, charisma, armor_class, initiative, speed,
            alignment, experience, userId], function (error, results, fields) {
                if (error) {
                    console.log('---- error is ---', error)
                    throw error;
                }
                console.log('---- repsonse ----', results);
                res.status(200).send(JSON.stringify(results));
            });
})

router.post('/changePassword', function (req, res, next) {
    const { userId, oldPassword, newPassword } = req.body;
    res.locals.connection.query(`SELECT * FROM user where user_id = ${userId} and password = '${oldPassword}'`, function (error, results, fields) {
        if (error) {
            console.log('---- error is ---', error)
            throw error;
        }
        console.log('--- select reponse --', results)
        if (results.length > 0) {
            res.locals.connection.query(`update user set password = '${newPassword}' where user_id = ${userId}`, function (error, results1, fields) {
                if (error) {
                    console.log('---- error is ---', error)
                    throw error;
                }
                console.log('---- repsonse ----', results1);
                res.status(200).send(JSON.stringify(results1));
            });
        } else {
            console.log('---- repsonse ----', results);
            res.status(200).send(JSON.stringify({ 'error': 'old password is wrong' }));
        }
    });
})


module.exports = router;
