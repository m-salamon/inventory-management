
exports.up = function(knex, Promise) {
   return knex.schema.createTable('customers', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('phone');
      table.string('mobile');
      table.string('email');
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.string('country');
      table.boolean('inactive').notNullable()
      table.timestamp('createdAt').default(knex.fn.now())
   });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('customers');
};
