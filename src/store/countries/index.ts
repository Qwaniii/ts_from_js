import StoreModule from '../module';
import exclude from '../../utils/exclude';


/**
 * Список стран
 */

type CountriesStateType = {
  list: any;
  waiting: boolean
  params: any
  count: number
}


class CountriesState extends StoreModule {
  /**
   * Начальное состояние
   */
  initState(): CountriesStateType {
    return {
      list: [],
      params: {
        // page: 1,
        limit: 10,
        query: '',
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(): Promise<void> {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки стран');

    const res = await this.services.api.request({
      url: `/api/v1/countries?fields=_id,title,code&limit=*`,
    });

    // Товар загружен успешно
    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
        waiting: false,
      },
      'страны загружены',
    );
  }



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
/*     if(this.config.saveParams){ */
      let urlSearch = new URLSearchParams(exclude(params, this.initState().params)).toString();
      const url =
        window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
      if (replaceHistory) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
/*     } */

    const apiParams = exclude(
      {
        limit: params.limit,
        // skip: (params.page - 1) * params.limit,
        fields: 'items(*),count',
        'search[query]': params.query,
      },
      {
        skip: 0,
        'search[query]': '',
      },
    );

    const res = await this.services.api.request({
      url: `/api/v1/countries?${new URLSearchParams(apiParams)}`,
    });
    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
        count: res.data.result.count,
        waiting: false,
      },
      'Загружеys страны из АПИ',
    );
  }

  async search(string) {

    const res = await this.services.api.request({
      url: `/api/v1/countries?search[query]=${string}&fields=_id,title,code&limit=*`,
    });

    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
      },
      'Поиск завершен',
    );


}

select(id) {

  this.setState(
    {
      ...this.getState(),
      list: this.getState().list.map(item => {
        item._id === id ? item.selected = !item.selected : item.selected
        return item
      })
    }
  )
  

}

}



export default CountriesState;
