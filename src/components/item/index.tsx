import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';
export type ItemType = {
  _id: string | number
  title: string
  price: number
}
type ItemProps = {
  item: ItemType
  link: string
  onAdd: (_id: string | number)=> {}
  labelCurr?: string
  labelAdd: string
  onSelectItem: (_id: string | number)=>void
}
function Item(props: ItemProps) {
  const { onAdd = () => {}, onSelectItem=()=>{}, labelCurr = '₽', labelAdd = 'Добавить' } = props;
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => {
      e.stopPropagation()
      onAdd(props.item._id)
    },
    onSelect: e => {
      onSelectItem(props.item._id)
    }
  };

  return (
    <div onClick={callbacks.onSelect} className={cn()}>
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(props.item.price)} {labelCurr}
        </div>
        <button onClick={callbacks.onAdd}>{labelAdd}</button>
      </div>
    </div>
  );
}

export default memo(Item);
