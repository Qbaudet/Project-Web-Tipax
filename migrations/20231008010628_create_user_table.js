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

    // Insert data into the users table
    await knex('users').insert([
        {id_user: 1, username: 'James', password: '@fqdsioufe44324JDFIC81&'},
        {id_user: 2, username: 'Amy', password: 'jfdsq`@fjiroezPQDSFfmfefqjd'},
        {id_user: 3, username: 'Kiara', password: 'fqoozze#dqfFrEQ&@'},
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable('users');
};
  