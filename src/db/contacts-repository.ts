import Knex = require("knex");
import {Contact} from "../models/contact";
import { injectable, inject } from "inversify";
import {DatabaseProvider} from "./database-provider";

@injectable()
export class ContactsRepository {

    private db: Knex;
    private tableName: string = 'contacts'

    public constructor(
        @inject(DatabaseProvider.name) public dbProvider: DatabaseProvider,
    ){
        this.db = dbProvider.provideDatabase()
    }

    insertContact(contact: Contact) {
        return this.db.table(this.tableName)
            .insert(contact)
    }

    updateContact(contact: Contact) {
        return this.db.table(this.tableName)
            .update(contact)
            .where('name', contact.name)
    }

    getAllContacts() {
        return this.db.table(this.tableName)
            .select('*')
    }

    delContact(name: string) {
        return this.db.delete()
            .from(this.tableName)
            .where("name", name)
    }

}

