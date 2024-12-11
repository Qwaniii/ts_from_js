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
import OptionCountry from '../../components/option-country';
import ItemCountry from '../../components/item-country';
import ListCountry from '../../components/list-country';
import Spinner from '../../components/spinner';


function SelectCustom({stateNameCatalog = 'catalog', stateNameCategories = 'categories'}) {



  const store = useStore();

  const select = useSelector((state) => {
    return {
        waiting: state.countries.waiting,
      sort: state[stateNameCatalog]?.params?.sort,
      query: state[stateNameCatalog]?.params?.query,
      category: state[stateNameCatalog]?.params?.category,
      country: state[stateNameCatalog]?.params?.madeIn,
      categories: state[stateNameCategories]?.list || [],
      countries: state.countries.list || [],
  }});

  const [isOpen, setIsOpen] = useState(false)


  const callbacks = {

    open: async () => {
        setIsOpen(!isOpen)
        await store.actions.countries.setParams()
    } ,

// -------------------------------------------------

    // Сортировка
    onSort: useCallback(sort => store.actions[stateNameCatalog].setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.countries.search(query), [store]),
    setSelect: useCallback(id => store.actions.countries.select(id), [store]),
    
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
          code: item.code
        })),
      ],
      [select.countries],
    ),
    getTitle: select.countries.filter(item => item._id === select.country),

  };

  const {t} = useTranslate();

  const renders = {
    item: useCallback(
      item => (
        <ItemCountry
          item={item}
          onSelectItem={callbacks.setSelect}
        />
      ),
      [callbacks],
    ),
  };





  return (
    <>
    <OptionCountry selectCountry="Country" openSelect={callbacks.open} classOpen={isOpen ? "classopen" : ""}>
    {isOpen && 

        <Spinner active={select.waiting}>
            <Input
                value={select.country}
                onChange={callbacks.onSearch}
                placeholder={'Поиск'}
                theme={'big'}
            />
            <ListCountry list={select.countries} renderItem={renders.item} />
        </Spinner>
      }
    </OptionCountry>
    </>

  );
}

export default memo(SelectCustom);
