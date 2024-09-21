const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '191100',
    host: 'localhost',
    port: 5432,
    database: 'bloggingDB',
});

async function connectClient() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Connection error', err.stack);
    }
}

connectClient();

module.exports = client;