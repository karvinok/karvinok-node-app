import {ContactsRepository} from "../db/contacts-repository";
import {Contact} from "../models/contact";
import { injectable, inject } from "inversify";

@injectable()
export class ContactsService {

    public constructor(
        @inject(ContactsRepository.name) public repo: ContactsRepository,
    ){}

    async getAllContacts() {
        const contacts = await this.repo.getAllContacts()
        //use contacts build logic
        return contacts
    }

    async setContact(contact: Contact) {
        if (contact.name == '') {
            return 'failed to add contact. name is empty'
        } else {
            await this.repo.insertContact(contact)
            return `inserted ${contact.name}`
        }
    }

    async updateContact(contact: Contact) {
        const res = await this.repo.updateContact(contact)
        if (res == 0) {
            return `Could not update ${contact.name}, name not found`
        } else {
            return `updated ${res} contacts with name ${contact.name}`
        }
    }

    async deleteContact(name: string) {
        const res = await this.repo.delContact(name)
        if (res == 0) {
            return `Could not delete ${name}, not found`
        } else {
            return `deleted ${res} contacts with name ${name}`
        }
    }

}
