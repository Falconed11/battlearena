const db = require('./db')
const bcrypt = require('bcrypt');

const getPlayer = () => db.query('SELECT * FROM player')
const addPlayer = ({ username, password }) => {
    const saltRounds = 10; // Number of salt rounds to generate

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                // Handle error
            } else {
                // Store the hash in your database
                return db.query(`INSERT INTO player (username, password) VALUES ('${username}', '${hash}')`)
            }
        });
    });


}

module.exports = { getPlayer, addPlayer }