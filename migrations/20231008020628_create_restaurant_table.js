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
        table.integer('associated_user').references('id_user').inTable('users').nullable();
    });
    await knex('restaurants').insert([
        {
            restaurant_name: 'Shake Shack',
            address: '512 Spectrum Center Dr Suite 512, Irvine, CA 92618',
            grade: 4,
            category: 'American',
            associated_user: 2
        },
        {
            restaurant_name: 'Mo\'s Grill',
            address: '1322 Grant Ave, San Francisco, CA 94133',
            grade: 5,
            category: 'Bar',
            associated_user: 3
        },
        {
            restaurant_name: 'Blaze Pizza',
            address: '4255 Campus Dr A120, Irvine, CA 92612',
            grade: 4,
            category: 'Pizzeria',
            associated_user: 2
        },
        {
            restaurant_name: 'Antojitos Cocina Mexicana',
            address: '100 Universal City Plaza, Universal City, CA 91608',
            grade: 1,
            category: 'Mexican',
            associated_user: 1
        },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable('restaurants');
};
  