import React, {useCallback, useEffect, useId, useState} from "react";
import CatalogFilter from "../catalog-filter";
import CatalogList from "../catalog-list";
import ModalLayout from "../../components/modal-layout";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Controls from "../../components/controls";

function ModalCatalogList({close=()=>{}}){

  const store = useStore();
  const [selectedItems, setSelectedItems] = useState([]);
  const stateName = 'catalog_' + useId();
  const stateName2 = 'categories_' + useId();

  useInit(
     async ()=>{
      store.create(stateName, 'catalog')
      store.create(stateName2, 'categories')
     await Promise.all([
      store.actions[stateName].initParams({}, false),
       store.actions[stateName2].load(),
    ]);
  },
    [],
    true,
    )
  //удаленние модалки в Store
  useEffect(()=>{
    return()=>{
      store.destroy(stateName)
      store.destroy(stateName2)
    }
  }, [store])
  const callbacks = {
    closeModal: useCallback(() => {
      close(null);
    }, [store]),

    handelOK: useCallback(() => {
      close(selectedItems);
    }, [selectedItems]),

    onSelectedItems: useCallback((item) => {
      setSelectedItems(item)
    }, []),
  };

  return (
    <ModalLayout
      title={'Список товаров'}
      labelClose={'Закрыть'}
      onClose={callbacks.closeModal}
    >
      <CatalogFilter stateNameCatalog={stateName} stateNameCategories={stateName2}/>
      <CatalogList stateName={stateName} onSelected={callbacks.onSelectedItems}/>
      <Controls onAdd={callbacks.handelOK} title={"Добавить товары"}/>
    </ModalLayout>
  );
}

export default ModalCatalogList
