import {Request, Response} from "express"
import {controller, httpGet, BaseHttpController} from "inversify-express-utils";

@controller('/')
export class IndexController extends BaseHttpController {

    constructor() {
        super();
    }

    @httpGet('/')
    public handleIndex(req: Request, res: Response) {
        console.log('index requested___')
        res.send('You can use ' +
            '\'GET/getAllContacts\'' +
            ' , \'POST/setContact\'' +
            ' and \'PUT/updateContact\'' +
            ' requests')
    }
}
