// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// knexfile.js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'tipax_database',
      user: 'max',
      password: 'n'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

