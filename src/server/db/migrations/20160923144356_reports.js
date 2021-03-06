exports.up = function(knex, Promise) {
  return knex.schema.createTable('reports', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.text('report').notNullable();
    table.dateTime('start_time');
    table.dateTime('end_time');
    table.varchar('lat');
    table.varchar('lon');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reports');
};
