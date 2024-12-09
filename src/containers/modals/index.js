import React, {memo, useCallback} from "react";
import ModalCount from "../../components/modal-count";
import Basket from "../../app/basket";
import useSelector from "../../hooks/use-selector";
import ModalCatalogList from "../modal-catalog-list";
import useStore from "../../hooks/use-store";
import codeGenerator from "../../utils/code-generator";

function Modals() {

  const modals = useSelector(state => state.modals.stack)

  return (
    <>
      {modals.map(({name, close}, idx) => {
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
