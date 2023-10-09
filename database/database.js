const development = require('../knexfile.js').development;
const knex = require('knex');

const configureKnex = knex(development);
module.exports = configureKnex;