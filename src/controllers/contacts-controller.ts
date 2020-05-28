import {Contact} from "../models/contact";
import {Request, Response} from "express";
import {BaseResponse, Status} from "../models/base-response";
import {ContactsService} from "../services/contacts-service";
import {
    controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from "inversify-express-utils";
import {inject} from "inversify";

@controller('/contacts')
export class ContactsController extends BaseHttpController {

    public constructor(@inject(ContactsService.name) public service: ContactsService,
    ) {
        super()
    }

    @httpGet('/getAll')
    public async getAll(request: Request, response: Response) {
        try {
            const res = await this.service.getAllContacts()
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send()
        }
    }

    @httpPost('/setContact')
    public async setContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        try {
            const res = await this.service.setContact(contact)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }

    @httpPut('/updateContact')
    public async updateContact(request: Request, response: Response) {
        let contact: Contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        }
        try {
            const res = await this.service.updateContact(contact)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }

    @httpDelete('/deleteContact')
    public async delContact(request: Request, response: Response) {
        let name: string = request.query['name'] as string

        try {
            const res = await this.service.deleteContact(name)
            await response.status(200).json(new BaseResponse(
                res, Status.OK
            ))
        } catch (e) {
            response.status(500).send(e)
        }
    }
}
