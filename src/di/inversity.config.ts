import "reflect-metadata";
import {Container} from "inversify";
import {InversifyExpressServer} from 'inversify-express-utils';

export class InversityConfig {
    container = new Container();

    registerProviders = (...providers: any[]) =>
        providers.forEach(provider => this.container.bind(provider.name).toSelf());

    getProvider = (provider: any): typeof provider => {
        return this.container.get(provider.name);
    };

    provideExpressServer(): InversifyExpressServer {
        return new InversifyExpressServer(this.container)
    }
}

