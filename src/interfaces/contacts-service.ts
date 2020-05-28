import {Contact} from "../models/contact";

export interface IContactsService {
    getAllContacts(): any

    setContact(contact: Contact): any

    updateContact(contact: Contact): any

    deleteContact(name: string): any
}

