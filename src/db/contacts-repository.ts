import Knex = require("knex");
import {Contact} from "../models/contact";
import {injectable, inject} from "inversify";
import {IContactsRepository} from "../interfaces/contacts-repo";
import {IDatabaseProvider} from "../interfaces/database-provider";
import {TYPES} from "../di/types";

@injectable()
export class ContactsRepository implements IContactsRepository {

    private db: Knex;
    private tableName: string = 'contacts'

    public constructor(
        @inject(TYPES.DatabaseProvider) public dbProvider: IDatabaseProvider,
    ) {
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

    getAllContacts(): any {
        return this.db.table(this.tableName)
            .select('*')
    }

    delContact(name: string) {
        return this.db.delete()
            .from(this.tableName)
            .where("name", name)
    }

}

