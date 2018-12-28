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

knex.raw('select 1+1 as result').catch(err => {
    console.error('ERROR CONNECTING: There was an error connecting to the database, make sure the DB is running and the connection keys are valid.')
});


module.exports = knex;