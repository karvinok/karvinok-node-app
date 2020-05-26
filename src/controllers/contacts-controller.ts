import {ContactsDao} from '../db/contacts-dao';
import {DatabaseProvider} from "../db/database-provider";
import {Contact} from "../models/contact";
import {Request, Response} from "express";

const dao = new ContactsDao(new DatabaseProvider().provideDatabase())

export class ContactsController {

    constructor() {
    }

    public handleGetAll(request: Request, response: Response) {
        dao.getAllContacts().then(contacts => {
            response.status(200).json({
                contacts,
                code: ""
            })
            console.log('get contacts ' + contacts)
        }).catch(error => {
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleSetContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        if (contact.name == '') {
            response.status(200).json('please enter contact name')
            return
        }
        dao.insertContact(contact).then(res => {
            response.send(`inserted ${contact.name}`)
            console.log('inserted ' + res)
        }).catch(error => {
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleDelContact(request: Request, response: Response) {
        let name: string = request.query['name'] as string

        dao.delContact(name).then(res => {
            response.send(res == 0 ? `Could not delete ${name}, not found` : `deleted ${name}`)
        }).catch(error => {
            response.status(400)
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleUpdateContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        dao.updateContact(contact).then(res => {
            response.send(`updated ${contact.name}`)
            console.log('updated' + res)
        }).catch(error => {
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }
}
