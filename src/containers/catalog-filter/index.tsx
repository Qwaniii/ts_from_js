import {memo, useCallback, useMemo, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import SelectCountry from '../../components/select-country';
import useInit from '../../hooks/use-init';


function CatalogFilter({stateNameCatalog = 'catalog', stateNameCategories = 'categories'}) {
  const store = useStore();
  
  useInit(
    async () => {
      await store.actions.countries.load()
    },
    [],
    true,
  );

  const select = useSelector((state) => {
    return {
      sort: state[stateNameCatalog]?.params?.sort,
      query: state[stateNameCatalog]?.params?.query,
      category: state[stateNameCatalog]?.params?.category,
      country: state[stateNameCatalog]?.params?.madeIn,
      categories: state[stateNameCategories]?.list || [],
      countries: state.countries.list || [],
  }});

  const [arr , setArr] = useState([])


  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions[stateNameCatalog].setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions[stateNameCatalog].setParams({query, page: 1}), [store]),
    
    // onSearchCountry: query => {
    //   const filterSearch = select.countries.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    //   setArr(filterSearch)
    // },

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
    onCountry: useCallback(
      madeIn =>
        store.actions[stateNameCatalog].setParams({
          madeIn,
          page: 1,
        })
      ,
      [store],
    )
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
        {value: '', title: 'Все категории'},
        ...treeToList(listToTree(select.categories), (item, level) => ({
          value: item._id,
          title: '- '.repeat(level) + item.title,
        })),
      ],
      [select.categories],
    ),
    countries: useMemo(
      () => [
        {value: '', title: 'Все страны', code: ' '},
        ...select.countries.map((item) => ({
          value: item._id,
          title: item.title,
          code: item.code,
          checked: false
        })),
      ],
      [select.countries],
    ),
    getTitle: select.countries.filter(item => select.country[0] === item._id),

  };


  const {t} = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <SelectCountry
        options={options.countries}
        value={select.country}
        onChange={callbacks.onCountry}
        getCountry={options.getTitle[0]}
        selectCountries={select.country}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        theme={'big'}
      />
      <button onClick={callbacks.onReset}>{t && t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
