import knex = require("knex");
import {IDatabaseProvider} from "../interfaces/database-provider";
import { injectable } from "inversify";

@injectable()
export class DatabaseProvider implements IDatabaseProvider{
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

