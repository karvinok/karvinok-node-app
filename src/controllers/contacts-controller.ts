import {BaseRequest} from "../models/vendors/base-request";
import {BaseResponse} from "../models/vendors/base-response";
import {ContactsDao} from '../db/contacts-dao';
import {DatabaseProvider} from "../db/database-provider";
import {Contact} from "../models/contact";
import {request} from "express";

const dao = new ContactsDao(new DatabaseProvider().provideDatabase())

export class ContactsController {

    constructor() {
    }

    public handleGetAll(request: BaseRequest, response: BaseResponse) {
        dao.getAllContacts().then(contacts => {
            response.json(contacts)
            console.log('get contacts ' + contacts)
        }).catch(error => {
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleSetContact(request: BaseRequest, response: BaseResponse) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        if (contact.name == '') {
            response.json('please enter the contact name')
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

    public handleDelContact(request: BaseRequest, response: BaseResponse) {
        let name: string = request.query['name'] as string

        dao.delContact(name).then(res => {
            response.send(res == 0 ? `Could not delete ${name}, not found` : `deleted ${name}`)
        }).catch(error => {
            response.status(400)
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleUpdateContact(request: BaseRequest, response: BaseResponse) {
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
