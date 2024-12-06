import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";

type ListProps = {
  list: any;
  // selectList?: any
  renderItem: (item: ItemType | ItemBasket)=> React.ReactNode;
}

function List({ list, renderItem }: ListProps) {
  // console.log('List', list)
  return (
    <div className="List">
      {list.map(item => (

        <div key={item._id} className={"List-item"+ (item.selected ? ' Item_selected' : '')}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default memo(List);
