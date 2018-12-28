
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('firstname');
    table.string('lastname');
    table.string('email');
    table.string('password');
    table.string('verify').notNullable()
    table.boolean('inactive').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
