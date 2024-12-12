import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';

// export type ItemType = {
//   _id: string | number
//   title: string
//   price: number
// }
// type ItemProps = {
//   item: ItemType
//   link: string
//   onAdd: (_id: string | number)=> {}
//   labelCurr?: string
//   labelAdd: string
//   onSelectItem: (_id: string | number)=>void
// }

function ItemCountry(props: any) {
  const { onAdd = () => {}, onSelectItem=()=>{}, ids} = props;
  const cn = bem('ItemCountry');
  
const [arr ,setArr] = useState<string[]>(ids.map(item => item._id))

  const callbacks = {
    onSearch: () => {
    },
    onSelect: e => {
      onSelectItem(props.item._id)
      setArr(prevState=> [...prevState, props.item._id])
    }
  };

  return (
    <div onClick={callbacks.onSelect} className={cn('', props.item.selected ? 'selected' : '')}>
      <div className={cn('code')}>
        <div>{props.item.code}</div>
      </div>
      <div className={cn('title')}>
        <div>{props.item.title}</div>
      </div>
    </div>
  );
}

export default memo(ItemCountry);
