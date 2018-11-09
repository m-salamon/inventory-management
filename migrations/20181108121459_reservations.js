
exports.up = function(knex, Promise) {
   return knex.schema.createTable('reservations', table => {
      table.increments('id').primary();
      table.integer('customerId');
      table.integer('itemId');
      table.boolean('inactive').notNullable()
      table.timestamp('createdAt').default(knex.fn.now())
   });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('reservations');
  
};
