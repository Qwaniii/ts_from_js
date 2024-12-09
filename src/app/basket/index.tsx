import {memo, useCallback, useEffect, useState} from 'react';
import { useDispatch, useStore as useStoreRedux } from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';

function Basket({close}: any) {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      close(null);
    }, []),
    openModalCatalogList: useCallback(async ()=>{
      const result = await store.actions.modals.open('modalCatalogList')
      if(!result) return
      for (const item of result as any) {
          await store.actions.basket.addToBasket(item._id);
      }
    }, []),
  };


  const { t } = useTranslate();

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t('')}
          labelDelete={t('basket.delete')}
        />
      ),
      [callbacks.removeFromBasket, t],
    ),
  };

  return (
    <ModalLayout
      title={t('basket.title')}
      labelClose={ t('basket.close')}
      onClose={callbacks.closeModal}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
      <button onClick={callbacks.openModalCatalogList}> Выбрать ещё товар </button>
    </ModalLayout>
  );
}

export default memo(Basket);
