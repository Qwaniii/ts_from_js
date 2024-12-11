import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {ItemType} from '../item';
import './style.css';
import {ItemBasket} from "../item-basket";

type ListCountryProps = {
  list: any;
  renderItem: (item: any)=> React.ReactNode;
}

function ListCountry({ list, renderItem }: ListCountryProps) {

  return (
    <div className="List">
      {list.map(item => (

        <div key={item._id} /* className={"List-item"+ (item.selected ? ' Item_selected' : '')} */>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default memo(ListCountry);
