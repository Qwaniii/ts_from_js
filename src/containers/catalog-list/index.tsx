import {memo, useCallback, useEffect, useState} from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Item from '../../components/item';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import Spinner from '../../components/spinner';



type CatalogListProps = {
  stateName: string
  onSelected: (selectItem: any[])=> void
}
function CatalogList({stateName,  onSelected=([])=>{}}: CatalogListProps) {
  const store = useStore();

  const select = useSelector(state => ({
      list:  state[stateName]?.list || [],
      selectedList: state[stateName]?.selectedList,
      page: state[stateName]?.params.page,
      limit: state[stateName]?.params.limit,
      sort: state[stateName]?.params.sort,
      query: state[stateName]?.params.query,
      count: state[stateName]?.count,
      waiting: state[stateName]?.waiting,
  }))


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открыть модалку с количеством товара
    openModalCount: useCallback(async (_id) =>{
      const result: number = await store.actions.modals.open('modalCount');
      if(result) store.actions.basket.addToBasketCount(_id, result)
    }, []),
    selectItem: useCallback(_id => {
      store.actions[stateName].selectItem(_id)
      onSelected(select.selectedList)
    }, [store]),

    // Пагинация
    onPaginate: useCallback(page => store.actions[stateName].setParams({ page }), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback(
      page => {
        return `?${new URLSearchParams({
          page,
          limit: select.limit,
          sort: select.sort,
          query: select.query,
        })}`;
      },
      [select.limit, select.sort, select.query],
    ),

  };

  useEffect(() => {
    onSelected(select.selectedList)
  }, [select.selectedList])

  const { t } = useTranslate();

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.openModalCount}
          link={`/articles/${item._id}`}
          labelAdd={t('article.add')}
          onSelectItem={stateName !=='catalog' ? callbacks.selectItem : (_id)=>{}}
        />
      ),
      [callbacks.addToBasket, t],
    ),
  };


  return (
    <>
      <Spinner active={select.waiting} >
        <List list={select.list} renderItem={renders.item} />
        <Pagination
          count={select.count}
          page={select.page}
          limit={select.limit}
          onChange={callbacks.onPaginate}
          makeLink={callbacks.makePaginatorLink}
        />
      </Spinner>
    </>

  );
}

export default memo(CatalogList);
