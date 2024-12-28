import Services, { AppConfig } from "../services";

export type SSRServiceClass = {
    servicese: Services
}


class SSRService {
    services: Services;
    config: AppConfig;
    promises: Array<() => void> ;
    names: Array<string>    


    constructor(services: Services, config: AppConfig, names: [] = []) {
        this.services = services;
        this.config = config;
        this.promises = [];
        this.names = names
    }

    add(promise, name) {
        if (name) {
        this.promises.push(promise)
        this.names.push(name)
        }
    }

    isNameExists(name) {
        return name && this.names.find(value => value === name)
    }

    clearName(name) {
        return (this.names = this.names.filter(value => value !== name))
    }
}

export default SSRService;