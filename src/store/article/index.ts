import StoreModule from '../module';
import {Article} from "../../components/article-card";

/**
 * Детальная ифнормация о товаре для страницы товара
 */

interface ApiResponse {
  data:{
    result: Article
  }
}
class ArticleState extends StoreModule {
  initState() {
    return {
      data: {} as ApiResponse,
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id: string): Promise<void> {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {} as Article,
      waiting: true,
    });

    try {
      const res = await this.services.api.request({
        url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      });

      // Товар загружен успешно
      this.setState(
        {
          data: res.data.result,
          waiting: false,
        },
        'Загружен товар из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {} as Article,
        waiting: false,
      });
    }
  }
}

export default ArticleState;
