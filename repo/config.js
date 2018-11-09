require('dotenv').config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST, //'localhost',
        user: process.env.DB_USER, //'user',
        password: process.env.DB_PASSWORD,// 'password',
        database: process.env.DB_NAME // 'simcha-organizer'
    }
});

module.exports = knex;