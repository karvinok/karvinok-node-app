import {ContactsDao} from '../db/contacts-dao';
import {DatabaseProvider} from "../db/database-provider";
import {Contact} from "../models/contact";
import {Request, Response} from "express";
import {BaseResponse, Status} from "../models/base-response";

const dao = new ContactsDao(new DatabaseProvider().provideDatabase())


export class ContactsController {

    //todo replace response body to base obj
    public handleGetAll(request: Request, response: Response) {
        dao.getAllContacts().then(contacts => {
            response.status(200).json(new BaseResponse(
                contacts, Status.OK
            ))
            console.log('get contacts ' + contacts)
        }).catch(error => {
            response.status(500).send('DB QUERY error: ' + error)
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
            response.status(400).json(new BaseResponse(
                'failed to add contact. name is empty', Status.EMPTY_NAME
            ))
            return
        }
        dao.insertContact(contact).then(res => {
            response.status(200).json(new BaseResponse(
                `inserted ${contact.name}`, Status.OK
            ))
            console.log('inserted ' + res)
        }).catch(error => {
            response.status(500).send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }

    public handleDelContact(request: Request, response: Response) {
        let name: string = request.query['name'] as string

        dao.delContact(name).then(res => {
            if (res == 0){
                response.status(200).json(new BaseResponse(
                    `Could not delete ${name}, not found`, Status.NO_SUCH_CONTACT
                ))
            }else {
                response.status(200).json(new BaseResponse(
                    `deleted ${name}`, Status.OK
                ))
            }
        }).catch(error => {
            response.status(500).send('DB QUERY error: ' + error)
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
            response.status(200).json({
                message: `updated ${contact.name}`
            })
            console.log('updated' + res)
        }).catch(error => {
            response.send('DB QUERY error: ' + error)
            console.log('DB QUERY error: ' + error)
        })
    }
}
