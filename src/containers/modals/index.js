import React, {memo, useCallback} from "react";
import ModalCount from "../../components/modal-count";
import Basket from "../../app/basket";
import useSelector from "../../hooks/use-selector";
import ModalCatalogList from "../modal-catalog-list";
import useStore from "../../hooks/use-store";
import codeGenerator from "../../utils/code-generator";

function Modals() {

  const store = useStore()
  const stackModals = useSelector(state => state.modals.stack)

  // const callbacks = {
  //   closeModalCount: useCallback((count, idModal)=>{
  //      store.actions.modals.close(idModal, count)
  //   }, []),
  //   closeBasket: useCallback((idModal)=>{
  //     store.actions.modals.close(idModal, null )
  //   }, []),
  //   closeCatalogList: useCallback((list, idModal )=>{
  //     store.actions.modals.close(idModal, list)
  //     store.actions.catalogModal.resetParams()
  //     store.actions.catalogModal.resetSelectItem()
  //   }, [])
  // }
  // const modals = {
  //   basket: <Basket key={codeGenerator()} />,
  //   modalCount: <ModalCount key={codeGenerator()}  />,
  //   modalCatalogList: <ModalCatalogList key={codeGenerator()}/> ,
  // }

  return (
    <>
      {stackModals.map(({name, close}, idx) => {
        switch (name){
          case 'basket':
            return <Basket key={idx} close={close}/>
          case 'modalCount':
            return <ModalCount key={idx} close={close} />
          case 'modalCatalogList':
            return <ModalCatalogList key={idx} close={close}/>
          default:
            return <></>
        }
      })}
    </>
  )
}

export default memo(Modals)
