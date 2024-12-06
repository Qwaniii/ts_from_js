import StoreModule from '../module';

/**
 * Список стран
 */
type CountriesStateType = {
  list: any;
  waiting: boolean
}
class CountriesState extends StoreModule {
  /**
   * Начальное состояние
   */
  initState(): CountriesStateType {
    return {
      list: [],
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
      'Категории загружены',
    );
  }
}

export default CountriesState;
