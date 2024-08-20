// knexfile.js
const path = require('path');

const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        }
    },

    test: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'test_database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        },
        pool: {
            min: 2,
            max: 10 // Increase this number if needed
        },
    },

    production: {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, 'db', 'database.sqlite')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path.join(__dirname, 'seeds')
        }
    }
};

module.exports = config;