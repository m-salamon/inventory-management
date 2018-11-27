
exports.up = function(knex, Promise) {
   return knex.schema.createTable('consigments', table => {
      table.increments('id').primary();
      table.integer('itemId');
      table.integer('customerId');
      table.string('shippeddate');
      table.string('shippedby');
      table.string('note');
      table.boolean('inactive').notNullable()
      table.timestamp('createdAt').default(knex.fn.now())
   });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('consigments');
};
