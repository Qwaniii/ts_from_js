export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name, idProduct = null) => {
    return { type: 'modal/open', payload: { name, idProduct } };
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: () => {
    return { type: 'modal/close' };
  },
};
