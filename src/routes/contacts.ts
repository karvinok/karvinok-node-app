import * as express from 'express';
import * as bodyParser from 'body-parser';
import {ContactsController} from "../controllers/contacts-controller";

const parser = bodyParser.json()
const router = express.Router()
const controller = new ContactsController()

router.get('/get-contacts', controller.handleGetAll)
router.post('/set-contact', parser, controller.handleSetContact)
router.put('/update-contact', parser, controller.handleUpdateContact)
router.delete('/del-contact', parser, controller.handleDelContact)

export {router as contactsRouter}

