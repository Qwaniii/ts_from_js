import React, {memo, useCallback, useState } from "react";
import ModalLayout from "../modal-layout";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import './style.css';
import {cn as bem} from "@bem-react/classname";


function ModalCount ({close}){
  const { t } = useTranslate();
  const store = useStore();
  const cn = bem('ModalCount');

  const [inputValue, setInputValue] = useState('1');

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      // store.actions.modals.close();
      close(null);
    }, [store]),
    handleOk: useCallback(() => {
      const parsedValue = parseFloat(inputValue);
      const result = isNaN(parsedValue) ? null : parsedValue;
      close(result);
    }, [inputValue]),

    handelMinus: useCallback(() => {
      setInputValue(prev=> +prev-1)
    }, [inputValue]),
    handelPlus: useCallback(() => {
      setInputValue(prev=> +prev+1)
    }, [inputValue]),
    handleChange: useCallback((e) => {
      setInputValue(e.target.value)
    }, [inputValue]),
  };

  return (
    <ModalLayout
      title={t('modalCount.title')}
      labelClose={t('modalCount.close')}
      onClose={callbacks.closeModal}
    >
      <div className={cn('inputWrapper')}>
        <input className={cn("input")} min={1} max={1000} type="number" value={inputValue} onChange={callbacks.handleChange}></input>
      </div>
      <div className={cn("footer")}>
          <button disabled={inputValue > 1000 || inputValue < 1 ? "disabled" : ""} className={cn("success")} onClick={callbacks.handleOk}>Ok</button>
          <button onClick={callbacks.closeModal}>{t('modalCount.cancel')}</button>
        </div>

    </ModalLayout>
  )
}

export default memo(ModalCount)