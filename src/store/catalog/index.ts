import StoreModule from '../module';
import exclude from '../../utils/exclude';
import {ItemType} from "../../components/item";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
type CatalogStateType = {
  list: ItemType[],
  selectedList: any[],
  params: {
    page: number
    limit: number
    sort: string
    query: string
    category: string
    madeIn: string
  },
  count: number
  waiting: boolean
}
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CatalogStateType {
    return {
      list: [],
      selectedList: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '',
        madeIn: '',
      },
      count: 0,
      waiting: false,
    };
  }



  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams: object = {}): Promise<void> {

    const urlParams = new URLSearchParams(window.location.search);
    let validParams: any = {};
    
    if (this.config.saveParams) {
      if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
      if (urlParams.has('limit'))
        validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
      if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
      if (urlParams.has('query')) validParams.query = urlParams.get('query');
      if (urlParams.has('category')) validParams.category = urlParams.get('category');
      if (urlParams.has('madeIn')) validParams.madeIn = urlParams.get('madeIn');
    }

    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams,};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false): Promise<void> {
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      'Установлены параметры каталога',
    );

    // Сохранить параметры в адрес страницы
    if(this.config.saveParams){
      let urlSearch = new URLSearchParams(exclude(params, this.initState().params)).toString();
      const url =
        window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
      if (replaceHistory) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    }

    const apiParams = exclude(
      {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        sort: params.sort,
        'search[query]': params.query,
        'search[category]': params.category,
        'search[madeIn]': params.madeIn,
      },
      {
        skip: 0,
        'search[query]': '',
        'search[category]': '',
        'search[madeIn]': '',
      },
    );

    const res = await this.services.api.request({
      url: `/api/v1/articles?${new URLSearchParams(apiParams)}`,
    });
    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
        count: res.data.result.count,
        waiting: false,
      },
      'Загружен список товаров из АПИ',
    );
    this.updateList()
  }

  selectItem(code) {
    const isSelected = this.getState().selectedList.some(item => item._id === code)
    let updatedSelectedList

    if (isSelected) {
      updatedSelectedList = this.getState().selectedList.filter(item => item._id !== code)
    } else {
      const selectedItem = this.getState().list.find(item => item._id === code);
      updatedSelectedList = [...this.getState().selectedList, selectedItem];
    }
    this.setState({
      ...this.getState(),
      list: this.getState().list.map(item => {
        if (item._id === code) {
          item.selected = !item.selected;
        }
        return item;
      }),
      selectedList: updatedSelectedList
    });
  }

  updateList() {
    const {list, selectedList} = this.getState()
    if (selectedList.length === 0) return
    let newUpdatedList
    for (const item of selectedList) {
      newUpdatedList = list.map(listItem => {
          if (listItem._id === item._id) {
            listItem.selected = !listItem.selected;
          }
          return listItem;
        }
      )
    }

    this.setState({
      ...this.getState(),
      list: newUpdatedList
    })
  }

  resetSelectItem() {
    this.setState({
      ...this.getState(),
      list: this.getState().list.map(item => item.selected && item.selected === false),
      selectedList: []
    })
  }
}

export default CatalogState;
