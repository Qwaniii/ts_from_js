import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";

type ListCountryProps = {
  list: any;
  renderItem: (item: any)=> React.ReactNode;
  setPage: any
  page: any
}

function ListCountry({ list, renderItem, setPage, page }: ListCountryProps) {

  const [next, setNext] = useState(0)

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // Когда последний элемент появляется в поле зрения, загружаем новые данные
        console.log("last")
        setPage(page + 1)

      }
    });
    if (node) observer.current.observe(node); // Запуск наблюдения за последним элементом
  }, [next]);


  return (
    <ul className="ListCountry">
      {list.map((item, index) => (
        <li key={item._id} ref={index + 1 === list.length ? lastItemRef : null}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default memo(ListCountry);
