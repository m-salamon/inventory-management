
exports.up = function(knex, Promise) {
   return knex.schema.createTable('items', table => {
      table.increments('id').primary();
      table.string('name').unique();
      table.string('colorcode');
      table.string('length');
      table.string('serialnumber');
      table.string('brand');
      table.string('status');
      table.string('costprice');
      table.string('sellprice');
      table.integer('consigmentId');
      table.integer('stockamount');
      table.boolean('inactive').notNullable()
      table.timestamp('createdAt').default(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('items');
};
