const knex = require('../database/database.js');


//Create endpoint
async function addToHistory({ checkBasePrice, taxRate, tipRate, finalAmount, restaurantName }) {
    
    try {
        // Insert data into the "checks" table
        const [insertedRecord] = await knex('checks').insert({
            base_price: checkBasePrice,
            tax_rate: taxRate,
            tip_rate: tipRate,
            final_amount: finalAmount,
            //associated_restaurant: null
        }).returning('*'); 

        return { success: true, message: 'Check added to history successfully, here is the json object of the record you inserted:\n', record: insertedRecord };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Failed to add check to history' };
    }
}

async function getHistoryRecords() {
    try {
        const records = await knex('checks').select('id_check','final_amount');
        return records;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function checkIfFAExists(finalAmount) {
    try {
        const check = await knex('checks').where('final_amount', finalAmount).first();
        return !!check; // Return true if check exists, false otherwise
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function checkIfIdExists(id_check) {
    try {
        const check = await knex('checks').where('id_check', id_check).first();
        return !!check; // Return true if check exists, false otherwise
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


async function getCheckDetailsByFA(finalAmount) {
    try {
      const checkDetails = await knex('checks').where('final_amount', finalAmount).first();
      return checkDetails;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

async function deleteCheck(id_check) {
    try {
        const checkExists = await checkIfIdExists(id_check);
        if (!checkExists) {
            return { success: false, message: 'Check not found' };
        }

        await knex('checks').where('id_check', id_check).del();

        return { success: true, message: 'Deletion successful, reload the page to see the changes.' };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error deleting the check' };
    }
}


/*
async function updateCheck(id_check, newRestaurantName) {
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

module.exports = { addToHistory, getHistoryRecords, getCheckDetailsByFA, checkIfFAExists, checkIfIdExists, deleteCheck};