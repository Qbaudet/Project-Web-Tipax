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

        return { success: true};
    } catch (error) {
        console.error('Error:', error);
        return { success: false};
    }
}

module.exports = {
    addRestaurant
};