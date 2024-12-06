import StoreModule from '../module';

/**
 * Список категорий
 */
type CategoriesStateType = {
  list: any;
  waiting: boolean
}
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CategoriesStateType {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(): Promise<void> {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки категорий');

    const res = await this.services.api.request({
      url: `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`,
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

export default CategoriesState;
