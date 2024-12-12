import StoreModule from '../module';
import exclude from '../../utils/exclude';
import list from '../../components/list';


/**
 * Список стран
 */

type CountriesStateType = {
  list: any;
  waiting: boolean
  params: any
  count: number
  listTitle: any
}


class CountriesState extends StoreModule {
  /**
   * Начальное состояние
   */
  initState(): CountriesStateType {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        query: '',
      },
      count: 0,
      waiting: false,
      listTitle: []
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



  async setParams(newParams = {}): Promise<void> {
    
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установка параметров стран"
    );

    const apiParams = exclude(
      {
        limit: params.limit,
        skip: (params.page - 1) * params.limit,
        fields: 'items(_id,title,code),count',
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
        list: this.getState().list.concat(res.data.result.items),
        waiting: false,
      },
      'Загружены страны из АПИ',
    );
  }

  async search(string) {

    const res = await this.services.api.request({
      url: `/api/v1/countries?search[query]=${string}&fields=_id,title,code&limit=*,count`,
    });

    this.setState(
      {
        ...this.getState(),
        list: res.data.result.items,
      },
      'Поиск завершен',
    );


}

  async searchByIds(array) {

    const res = await this.services.api.request({
      url: `/api/v1/countries?search[ids]=${array}&fields=_id,title,code&limit=*,count`,
    });

    this.setState(
      {
        ...this.getState(),
        listTitle: res.data.result.items,
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
  console.log("selecct")
  

}

}



export default CountriesState;
