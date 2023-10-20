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
        table.integer("associated_restaurant").references("id_restaurant").inTable("restaurants").onDelete('SET NULL');
        table.integer("associated_user").references("id_user").inTable("users").nullable();
    });
    await knex('checks').insert([
        {
            base_price: 56.00,
            tax_rate: 10.00,
            tip_rate: 20.00,
            final_amount: 72.80,
            check_date: '2022-12-17',
            associated_restaurant: 3,
            associated_user: 1
        },
        {
            base_price: 47.00,
            tax_rate: 8.00,
            tip_rate: 15.00,
            final_amount: 57.81,
            check_date: '2023-01-09',
            associated_restaurant: 1,
            associated_user: 1
        },
        {
            base_price: 79.60,
            tax_rate: 9.30,
            tip_rate: 18.00,
            final_amount: 101.34,
            check_date: '2023-03-09',
            associated_restaurant: 2,
            associated_user: 2
        },
        {
            base_price: 103.56,
            tax_rate: 9.80,
            tip_rate: 20.00,
            final_amount: 134.44,
            check_date: '2023-06-29',
            associated_restaurant: 4,
            associated_user: 1
        },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTable('checks');
};
