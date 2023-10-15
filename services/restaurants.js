const knex = require('../database/database.js');


//Create endpoint
async function addRestaurant({ restaurantInfo }) {
    
    try {
        // Insert data into the "checks" table
        const [insertedRecord] = await knex('restaurants').insert({
            restaurant_name: restaurantInfo.r_name,
            address: restaurantInfo.r_local,
            grade: restaurantInfo.r_rating,
            category: restaurantInfo.r_category,
            associated_user: null
        }).returning('*'); 

        return { success: true, message: 'Check added to history successfully, here is the json object of the record you inserted:\n', record: insertedRecord };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Failed to add check to history' };
    }
}

module.exports = {
    addRestaurant
};