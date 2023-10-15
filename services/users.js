const knex = require('../database/database.js');


//Create endpoint
async function addUser({ username, password }) {
    
    try {
        // Insert data into the "checks" table
        const [insertedRecord] = await knex('users').insert({
            username: username,
            password: password
        }).returning('*'); 

        return { success: true};
    } catch (error) {
        console.error('Error:', error);
        return { success: false};
    }
}

module.exports = {
    addUser
};