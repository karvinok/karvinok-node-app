import {Contact} from "../models/contact";
import {Request, Response} from "express";
import {BaseResponse, Status} from "../models/base-response";
import {
    controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from "inversify-express-utils";
import {inject} from "inversify";
import {TYPES} from "../di/types";
import {IContactsService} from "../interfaces/contacts-service";

@controller('/contacts')
export class ContactsController extends BaseHttpController {

    public constructor(@inject(TYPES.ContactsService) public service: IContactsService,
    ) {
        super()
    }

    @httpGet('/get-all')
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

    @httpPost('/set-contact')
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

    @httpPut('/update-contact')
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

    @httpDelete('/del-contact')
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
