import "reflect-metadata";
import Knex from "knex";

export interface IDatabaseProvider {
    provideDatabase() : Knex
}

