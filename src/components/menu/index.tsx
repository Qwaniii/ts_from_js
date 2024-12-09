import React, {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

type ItemNavigate = {
  key: number;
  link: string;
  title: string;
}
type MenuProps = {
  items: ItemNavigate[];
  onNavigate: (item: ItemNavigate) => void,
}

function Menu({items = [], onNavigate}: MenuProps) {
  const cn = bem('Menu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default memo(Menu);
