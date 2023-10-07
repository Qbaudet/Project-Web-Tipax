import { development } from '../knexfile.js';
import knex from 'knex';

const configureKnex = knex(development);
export default configureKnex;