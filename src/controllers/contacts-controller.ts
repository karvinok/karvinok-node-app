import {Contact} from "../models/contact";
import {Request, Response} from "express";
import {BaseResponse, Status} from "../models/base-response";
import {ContactsService} from "../services/contacts-service";

const service = new ContactsService()

export class ContactsController {

    public handleGetAll(request: Request, response: Response) {
        service.getAllContacts().then(contacts => {
            response.status(200).json(new BaseResponse(
                contacts, Status.OK
            ))
        }).catch((error) => {
            response.status(500).send('DB QUERY error: ' + error)
        })
    }

    public handleSetContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        service.setContact(contact).then((res) => {
            response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        }).catch((error) => {
            response.status(500).send()
        })
    }

    public handleUpdateContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        service.updateContact(contact).then(() => {
            response.status(200).json(new BaseResponse(
                `updated ${contact.name}`, Status.OK
            ))
        }).catch(() => {
            response.status(500).send()
        })
    }

    public handleDelContact(request: Request, response: Response) {
        let name: string = request.query['name'] as string

        service.deleteContact(name).then((resString) => {
            response.status(200).json(new BaseResponse(
                resString, Status.OK
            ))
        }).catch(() => {
            response.status(500).send()
        })
    }
}
