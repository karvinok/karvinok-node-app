import "reflect-metadata";
import {ContactsService} from "./services/contacts-service";
import {DatabaseProvider} from "./db/database-provider";
import * as bodyParser from 'body-parser';
import {TYPES} from "./di/types";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import {IDatabaseProvider} from "./interfaces/database-provider";
import {IContactsService} from "./interfaces/contacts-service";
import {ContactsRepository} from "./db/contacts-repository";
import {IContactsRepository} from "./interfaces/contacts-repo";
import {ContactsController} from "./controllers/contacts-controller";
import {IndexController} from "./controllers/index-controller";

const port = 3000

const container = new Container();

container.bind<IndexController>(TYPES.IndexController).to(IndexController);
container.bind<ContactsController>(TYPES.ContactsController).to(ContactsController);
container.bind<IContactsRepository>(TYPES.ContactsRepository).to(ContactsRepository);
container.bind<IContactsService>(TYPES.ContactsService).to(ContactsService);
container.bind<IDatabaseProvider>(TYPES.DatabaseProvider).to(DatabaseProvider);

const app = new InversifyExpressServer(container).setConfig((app) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}).build()

app.listen(port, () => {
    console.log('server is listening ' + port)
})

