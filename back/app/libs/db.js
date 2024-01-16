const db = require('knex')({
    client: 'postgresql',
    connection: __config.connections.pg,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
});

module.exports = {
    db
};