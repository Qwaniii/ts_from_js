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
        <button className={cn('btn-action')} onClick={callbacks.handelMinus} disabled={+inputValue <=1}>-</button>
        <input
          className={cn('input')}
          readOnly
          type={'number'}
          min={"1"}
          max={"100"}
          value={inputValue}
          onChange={callbacks.handleChange}
          placeholder="Введите число"
        />
        <button className={cn('btn-action')} onClick={callbacks.handelPlus} disabled={+inputValue >10} >+</button>
      </div>
      <div className={cn('btns', 'ok')}>
        <button className={cn('btn', 'ok')} onClick={callbacks.handleOk}>OK</button>
        <button className={cn('btn', 'cancel')} onClick={callbacks.closeModal}>{t('modalCount.cancel')}</button>
      </div>
    </ModalLayout>
  )
}

export default memo(ModalCount)
