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
      user: 'db_user_web',
      password: 'db_user_web_pwd'
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

