/**updating
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('checks', (table) => {
    table.increments('id_check').primary();
    table.float('base_price').notNullable();
    table.float('tax_rate').notNullable();
    table.float('tip_rate').notNullable();
    table.string('final_amount').notNullable();
    table.date("check_date").defaultTo(knex.fn.now());
    table.integer("associated_restaurant").references("id_restaurant").inTable("restaurants");
    table.integer("associated_user").references("id_user").inTable("users");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable('checks');
  };
