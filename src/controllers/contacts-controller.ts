import {Contact} from "../models/contact";
import {Request, Response} from "express";
import {BaseResponse, Status} from "../models/base-response";
import {ContactsService} from "../services/contacts-service";

const service = new ContactsService()

export class ContactsController {

    public async handleGetAll(request: Request, response: Response) {
        try {
            const res = await service.getAllContacts()
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send()
        }
    }

    public async handleSetContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        try {
            const res = await service.setContact(contact)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }

    public async handleUpdateContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        try {
            const res = await service.updateContact(contact)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }

    public async handleDelContact(request: Request, response: Response) {
        let name: string = request.query['name'] as string

        try {
            const res = await service.deleteContact(name)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }
}
