import knex = require("knex");

export class DatabaseProvider {
    provideDatabase() {
        return knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'userok',
                password: 'password',
                database: 'api'
            },  //todo чекнуть как получить connection колбеки
            pool: {}
        })
    }
}

