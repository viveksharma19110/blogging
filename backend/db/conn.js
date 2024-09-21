const { Pool } = require('pg');

const client = new Pool({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'bloggingDB',
});

module.exports = client;