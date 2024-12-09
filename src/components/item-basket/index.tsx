import React, {memo, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.css';
export type ItemBasket = {
  _id: string | number
  title: string
  price: number
  amount: number;
}
type ItemBasketProps = {
  item: ItemBasket;
  link: string,
  onLink: () => void,
  onRemove: (_id: string | number) => void,
  labelCurr?: string;
  labelDelete: string;
  labelUnit: string;
}

function ItemBasket(props: ItemBasketProps) {
  const {
    onRemove = () => {
    }, labelCurr = '₽', labelUnit = 'шт', labelDelete = 'Удалить'
  } = props;
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.link ? (
          <Link to={props.link} onClick={props.onLink}>
            {props.item.title}
          </Link>
        ) : (
          props.item.title
        )}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount || 0)} {labelUnit}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{labelDelete}</button>
        </div>
      </div>
    </div>
  );
}


export default memo(ItemBasket);
