const knex = require('../database/database.js');


//Create endpoint
async function addToHistory({ checkBasePrice, taxRate, tipRate, finalAmount, restaurantName }) {
    
    try {
        // Insert data into the "basic_check" table
        const [insertedRecord] = await knex('basic_check').insert({
            base_price: checkBasePrice,
            tax_rate: taxRate,
            tip_rate: tipRate,
            final_amount: finalAmount,
            restaurant_name: restaurantName,
        }).returning('*'); 

        return { success: true, message: 'Check added to history successfully, here is the json object of the record you inserted:\n', record: insertedRecord };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Failed to add check to history' };
    }
}

async function getHistoryRecords() {
    try {
        const records = await knex('basic_check').select('id_check','final_amount','restaurant_name');
        return records;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function checkIfFAExists(finalAmount) {
    try {
        const check = await knex('basic_check').where('final_amount', finalAmount).first();
        return !!check; // Return true if check exists, false otherwise
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


async function getCheckDetailsByFA(finalAmount) {
    try {
      const checkDetails = await knex('basic_check').where('final_amount', finalAmount).first();
      return checkDetails;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

module.exports = { addToHistory, getHistoryRecords, getCheckDetailsByFA, checkIfFAExists };