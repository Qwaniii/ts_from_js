import APIService from './api';
import Store from './store';
import createStoreRedux from './store-redux';

export type KeyModulesConfig = keyof ModulesConfig | string
export type ModulesConfig = {
  session: {
    tokenHeader: string;
  };
  catalog: {
    saveParams: boolean;
  };
  [key: string]: any;
};
export type StoreConfig = {
  log: boolean;
  modules: ModulesConfig
}
export type AppConfig = {
  store: StoreConfig;
  api: {
    baseUrl: string;
  }
  redux:{}
};

class Services {
   _api: any
   _store?: Store
   _redux: any
  config: AppConfig

  constructor(config: AppConfig) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(): Store {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}

export default Services;
