/**updating
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    await knex.schema.createTable('restaurants', (table) => {
      table.increments('id_restaurant').primary();
      table.string('restaurant_name').notNullable();
      table.string('address');
      table.integer('grade');
      table.string('category');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async knex => {
      await knex.schema.dropTable('restaurants');
    };
  