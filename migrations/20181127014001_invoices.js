
exports.up = function(knex, Promise) {
  return knex.schema.createTable('invoices', table => {
    table.increments('id').primary();
    table.integer('customerId');
    table.integer('itemId');
    table.string('solddate');
    table.boolean('inactive').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('invoices');
};
