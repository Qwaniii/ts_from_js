import {memo, useCallback, useEffect, useMemo, useState} from 'react';
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
      page: state.countries.params?.page,
      country: state[stateNameCatalog]?.params?.madeIn,
      countries: state.countries.list || [],
      countriesTitle: state.countries.listTitle || [],
  }});

  const [isOpen, setIsOpen] = useState(false)


  const callbacks = {

    open:  async () => {
        setIsOpen(!isOpen)
    } ,
    load: useCallback(async (value) => await store.actions.countries.setParams({page: value}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.countries.search(query), [store]),
    onSearchTitle: useCallback((ids) => store.actions.countries.searchByIds(ids), [store]),
    setSelect: useCallback(id => store.actions.countries.select(id), [store]),
  };

  const options = {
    getTitle: select.countries.filter(item => item.selected),
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

  const [page, setPage] = useState(1)

  useEffect(() => {
    callbacks.load(page)
  }, [page])

  return (
    <SideLayout padding="medium">
    
      <OptionCountry  selectCountry={select.countriesTitle} 
                      titleCountry={options.getTitle} 
                      searchTitle={callbacks.onSearchTitle} 
                      openSelect={callbacks.open} 
                      classOpen={isOpen ? "classopen" : ""}>
      {isOpen && 

          <Spinner active={select.waiting}>
              <Input
                  value={select.country}
                  onChange={callbacks.onSearch}
                  placeholder={'Поиск'}
                  theme={'med'}
              />
              <ListCountry list={select.countries} setPage={setPage} page={page} renderItem={renders.item} />
          </Spinner>
        }
      </OptionCountry>
      <button onClick={() => null}>{t && t('filter.reset')}</button>
    </SideLayout>

  );
}

export default memo(SelectCustom);
