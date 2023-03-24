const mysql2 = require('mysql2');
const config = require('../config/dbconfig');

const pool = mysql2.createPool(config.db);

module.exports = pool.promise();