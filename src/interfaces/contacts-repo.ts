import {Contact} from "../models/contact";

export interface IContactsRepository {
    insertContact(contact: Contact): any
    updateContact(contact: Contact): any
    getAllContacts(): any
    delContact(name: string): any
}

