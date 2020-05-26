import {BaseRequest} from "../models/vendors/base-request";
import {BaseResponse} from "../models/vendors/base-response";

export class IndexController {
    public handleIndex(req: BaseRequest, res: BaseResponse) {
        console.log('index requested___')
        res.send('You can use ' +
            '\'GET/getAllContacts\'' +
            ' , \'POST/setContact\'' +
            ' and \'PUT/updateContact\'' +
            ' requests')
    }
}
