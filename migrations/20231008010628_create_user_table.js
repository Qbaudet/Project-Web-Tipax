/**updating
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    await knex.schema.createTable('users', (table) => {
      table.increments('id_user').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async knex => {
      await knex.schema.dropTable('users');
    };
  