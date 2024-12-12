import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";

type ListCountryProps = {
  list: any;
  renderItem: (item: any)=> React.ReactNode;

  load: any
}

function ListCountry({ list, renderItem,  load }: ListCountryProps) {

  const [page, setPage] = useState(1)

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Когда последний элемент появляется в поле зрения, загружаем новые данные
        load(page)
        setPage(page + 1)
      }
    });
    if (node) observer.current.observe(node); // Запуск наблюдения за последним элементом
  }, []);



  return (
    <>
    <ul className="ListCountry">
      {list.map((item, index) => (
        <li key={item._id} >
          {renderItem(item)}
        </li>
      ))}
    </ul>
    <div ref={lastItemRef}></div>
    </>
  );
}

export default memo(ListCountry);
