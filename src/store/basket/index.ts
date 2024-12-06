import StoreModule from '../module';
import {ItemBasket} from "../../components/item-basket";

/**
 * Покупательская корзина
 */
type BasketStateType = {
  list: ItemBasket[];
  sum: number;
  amount: number;
}
class BasketState extends StoreModule {
  initState(): BasketStateType {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id {String} Код товара
   */
  async addToBasket(_id: string): Promise<void> {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      const res = await this.services.api.request({ url: `/api/v1/articles/${_id}` });
      const item = res.data.result;

      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }
  /**
   * Добавление товара в корзину с заданным количеством
   * @param _id {String} Код товара
   */
  async addToBasketCount(_id: string, count: number): Promise<void> {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + count };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      const res = await this.services.api.request({ url: `/api/v1/articles/${_id}` });
      const item = res.data.result;

      list.push({ ...item, amount: count }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price * count;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }
  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id: string) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default BasketState;
