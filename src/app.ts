import {InversityConfig} from "./di/inversity.config";
import {ContactsService} from "./services/contacts-service";
import {DatabaseProvider} from "./db/database-provider";
import * as bodyParser from 'body-parser';

const port = 3000
const inversityConfig = new InversityConfig()

inversityConfig.registerProviders({
    ContactsService,
    DatabaseProvider
})

const app = inversityConfig.provideExpressServer().setConfig((app) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}).build()

app.listen(port, () => {
    console.log('server is listening ' + port)
})

