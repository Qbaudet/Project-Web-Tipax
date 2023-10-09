/**updating
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.createTable('assignment_4_check_table', (table) => {
    table.increments('id_check');
    table.float('base_price');
    table.float('tax_rate');
    table.float('tip_rate');
    table.string('final_amount');
    table.string("restaurant_name");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable('assignment_4_check_table');
  };
