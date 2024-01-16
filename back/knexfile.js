module.exports = {
  production: {
    client: 'pg',
    connection: __config.connections.pg,
  }
};
