import {Request, Response} from "express"

export class IndexController {
    public handleIndex(req: Request, res: Response) {
        console.log('index requested___')
        res.send('You can use ' +
            '\'GET/getAllContacts\'' +
            ' , \'POST/setContact\'' +
            ' and \'PUT/updateContact\'' +
            ' requests')
    }
}
