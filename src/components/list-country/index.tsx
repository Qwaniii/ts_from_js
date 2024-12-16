import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes, { node } from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";

type ListCountryProps = {
  list: any;
  renderItem: (item: any)=> React.ReactNode;

  scroll: any
}

function ListCountry({ list, renderItem,  scroll }: ListCountryProps) {

  // useEffect(() => {
  //   load(page)
  // }, [page])



  return (
    <>
    <ul className="ListCountry" onScroll={scroll}>
      {list.map((item, index) => (
        <li key={item._id}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
    </>
  );
}

export default memo(ListCountry);
