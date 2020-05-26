"use strict";
exports.__esModule = true;
exports.DatabaseProvider = void 0;
var knex = require("knex");
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider() {
    }
    DatabaseProvider.prototype.provideDatabase = function () {
        return knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'userok',
                password: 'password',
                database: 'api'
            },
            pool: {}
        });
    };
    return DatabaseProvider;
}());
exports.DatabaseProvider = DatabaseProvider;
