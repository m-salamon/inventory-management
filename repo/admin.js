const knex = require('./config');

function getUsers() {
  let query = knex('users').select('*').orderBy('id', 'desc')
  return query;
}

function isAdmin(id) {
  let query = knex('users').select('*').where('id', id)
  return query;
}

function verifyUser(id) {
  let query = knex('users').update({ verify: 1 }).where('id', id)
  return query;
}

function deleteUser(id) {
  let query = knex('users').where('id', id).del()
  return query;
}

module.exports = { getUsers, verifyUser, deleteUser, isAdmin };