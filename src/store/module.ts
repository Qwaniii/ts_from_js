/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
import Services, {AppConfig, ModulesConfig, StoreConfig} from "../services";

class StoreModule {

  store;
  name: string;
  config: ModulesConfig
  services: Services

  constructor(store, name, config) {
    this.store = store;
    this.name = name;
    this.config = config;
    /** @type {Services} */
    this.services = store.services;
  }

  initState() {
    return {} ;
  }

  getState() {
    return this.store.getState()[this.name];
  }

  setState(newState, description = 'setState') {
    this.store.setState(
      {
        ...this.store.getState(),
        [this.name]: newState,
      },
      description,
    );
  }
}

export default StoreModule;
