import * as modules from './exports';
import Services, {KeyModulesConfig, ModulesConfig, StoreConfig} from "../services";

/**
 * Хранилище состояния приложения
 */

type Modules = typeof modules
type ModulesKey = keyof Modules
type StoreStateModuleKeys<T extends ModulesKey> = T | `${T}_${string}`
type StoreStateModule = `${keyof typeof modules}${string}`
export type StoreState = {
  [key in ModulesKey as StoreStateModuleKeys<key>]: ReturnType<InstanceType<typeof modules[key]>['initState']>
}
type StoreActions = {
  [key in ModulesKey as StoreStateModuleKeys<key>]: InstanceType<typeof modules[key]>
}
// //Тип для каждого класса modules
// type ModulesInstances = {
//   [key in KeyModules]: InstanceType<Modules[key]>
// }
// //Тип для каждого экземпляра modules
// export type ModulesState = {
//   [key in KeyModules]: ReturnType<ModulesInstances[key]['initState']>
// }

// const modules: AllModules = m

// type ModuleConstructor = { new (...args: any[]): any };

// type ExtendableModules = {
//   [key: string]: ModuleConstructor;
// }

// type AllModules = typeof m & ExtendableModules;
// type KeyModules = keyof AllModules;

// type ModulesInstances = {
//   [key in KeyModules]: InstanceType<AllModules[key]>
// }
// export type ModulesState = {
//   [key in KeyModules]: ReturnType<ModulesInstances[key]['initState']>
// }


class Store {
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  services: Services;
  config: StoreConfig;
  listeners: Array<(state: StoreState) => void> ;
  state: StoreState;
  actions: StoreActions;


  constructor(services: Services, config: StoreConfig , initState: StoreState= {} as StoreState ) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
     * basket: BasketState,
     * catalog: CatalogState,
     * modals: ModalsState,
     * article: ArticleState,
     * locale: LocaleState,
     * categories: CategoriesState,
     * session: SessionState,
     * profile: ProfileState
     * }} */
    this.actions = {} as StoreActions;

    for (const name of Object.keys(modules) as any) {

      this.create(name, name)
    }
  }

  create<T extends ModulesKey, K extends StoreStateModuleKeys<T>>(newName: K, baseState: T, options = {}):void {
    const moduleConfig  = {...(this.config?.modules[newName] || {} ) , ...options} ;

    this.actions[newName] = new modules[baseState](this, newName, moduleConfig) as StoreActions[K];
    this.state[newName] = this.actions[newName].initState() as StoreState[K];
  }

  destroy(name: string) {
    delete this.actions[name];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {{
   * basket: Object,
   * catalog: Object,
   * modals: Object,
   * article: Object,
   * locale: Object,
   * categories: Object,
   * session: Object,
   * profile: Object,
   * }}
   */
  getState(): StoreState {
    return this.state;
  }

  /**
   * Установка состояния

   */
  setState(newState, description = 'setState') {
    if (this.config.log) {
      console.group(
        `%c${'store.setState'} %c${description}`,
        `color: ${'#777'}; font-weight: normal`,
        `color: ${'#333'}; font-weight: bold`,
      );
      console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
      console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
      console.log(`%c${'actions:'}`, `color: ${'#2fa827'}`, this.actions);
      console.groupEnd();
    }
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Store;


