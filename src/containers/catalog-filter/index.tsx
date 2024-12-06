import {memo, useCallback, useMemo, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';

function CatalogFilter({stateNameCatalog = 'catalog', stateNameCategories = 'categories'}) {
  const store = useStore();

  const select = useSelector((state) => {
    // console.log('CatalogFilter state', state)
    return{
    sort: state[stateNameCatalog]?.params?.sort,
    query: state[stateNameCatalog]?.params?.query,
    category: state[stateNameCatalog]?.params?.category,
    categories: state[stateNameCategories]?.list || [],
  }});

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions[stateNameCatalog].setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions[stateNameCatalog].setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions[stateNameCatalog].resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(
      category =>
        store.actions[stateNameCatalog].setParams({
          category,
          page: 1,
        })
      ,
      [store],
    ),
  };

  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        {value: 'order', title: 'По порядку'},
        {value: 'title.ru', title: 'По именованию'},
        {value: '-price', title: 'Сначала дорогие'},
        {value: 'edition', title: 'Древние'},
      ],
      [],
    ),
    // Категории для фильтра
    categories: useMemo(
      () => [
        {value: '', title: 'Все'},
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: '- '.repeat(level) + item.title,
        })),
      ],
      [select.categories],
    ),
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        // delay={1000}
        theme={'big'}
      />
      <button onClick={callbacks.onReset}>{t && t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
