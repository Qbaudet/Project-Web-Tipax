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
async function getRestaurantNames() {
    try {
        const records = await knex('restaurants').select('restaurant_name');
        return records;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getRestaurantIdByName(restaurantName) {
    try {
        const restaurant = await knex('restaurants').where('restaurant_name', restaurantName).first();
        return restaurant.id_restaurant;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getRestaurantNameById(restaurantId) {
    try {
        const restaurant = await knex('restaurants').where('id_restaurant', restaurantId).first();
        return restaurant.restaurant_name;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


async function getRestaurantsRecords() {
    try {
        const records = await knex('restaurants').select('*');
        return records;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


/*
async function updateRestaurants(restaurant_name, restaurant_name) {
    try {
        const checkExists = await checkIfIdExists(id_check);
        if (!checkExists) {
            return { success: false, message: 'Check not found' };
        }

        await knex('checks').where('id_check', id_check).update('restaurant_name', newRestaurantName);

        return { success: true, message: 'Update successful, reload the page to see the changes.' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error updating the check' };
    }
}*/


module.exports = {
    addRestaurant,
    getRestaurantNames,
    getRestaurantIdByName,
    getRestaurantNameById,
    getRestaurantsRecords
};