const connection = require('../db-config');

const findUserByEmail = (email) =>
    connection
    .promise()
    .query('SELECT * FROM users WHERE email=?',
        [email]);

const insertUser = (pseudo, password, level, experience, role, email, avatar) =>
    connection
    .promise()
    .query('INSERT INTO users (`pseudo`, `password`, `level`, `experience`,  `role`, `email`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [pseudo, password, level, experience, role, email, avatar]);

module.exports = {
    findUserByEmail,
    insertUser,
};