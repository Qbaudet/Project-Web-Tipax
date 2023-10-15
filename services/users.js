const knex = require('../database/database.js');
const bcrypt = require('bcrypt');

//Create endpoint
async function addUser({ username, hash }) {
    try {
        // Insert data into the "checks" table
        const [insertedRecord] = await knex('users').insert({
            username: username,
            password: hash
        }).returning('*'); 

        return { success: true};
    } catch (error) {
        console.error('Error:', error);
        return { success: false};
    }
}

async function login({ username, password }) {
    try {
        const users = await knex('users').where('username', username);
        
        for(const user of users){
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                return { success: true};
            } 
            return { success: false};
    }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    addUser, 
    login
};