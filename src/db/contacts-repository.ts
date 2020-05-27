import Knex = require("knex");
import {Contact} from "../models/contact";

export class ContactsRepository {

    constructor(public db: Knex) {}

    tableName: string = 'contacts'

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

