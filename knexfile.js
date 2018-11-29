// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: './dev.sqlite3',
      connection: 'postgres://localhost/palette-picker',
      migrations: {
        directory: './db/migrations'
      },
      useNullAsDefault: true
    }
  },

};
