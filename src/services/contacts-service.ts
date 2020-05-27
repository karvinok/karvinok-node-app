import {ContactsRepository} from "../db/contacts-repository";
import {DatabaseProvider} from "../db/database-provider";
import {Contact} from "../models/contact";

const repo = new ContactsRepository(new DatabaseProvider().provideDatabase())

export class ContactsService {

    async getAllContacts() {
        const contacts = await repo.getAllContacts()
        return contacts
    }

    async setContact(contact: Contact) {
        if (contact.name == '') {
            return 'failed to add contact. name is empty'
        } else {
            await repo.insertContact(contact)
            return `inserted ${contact.name}`
        }
    }

    async updateContact(contact: Contact) {
        const res = await repo.updateContact(contact)
        if (res == 0) {
            return `Could not update ${contact.name}, name not found`
        } else {
            return `updated ${res} contacts with name ${contact.name}`
        }
    }

    async deleteContact(name: string) {
        const res = await repo.delContact(name)
        if (res == 0) {
            return `Could not delete ${name}, not found`
        } else {
            return `deleted ${res} contacts with name ${name}`
        }
    }

}
