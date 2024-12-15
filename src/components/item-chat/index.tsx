import React, { memo, useEffect } from 'react'
import 'style.css'
import { cn as bem } from '@bem-react/classname'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function ItemChat({ message, user, confirm }) {

  const cn = bem('ItemChat');

  const date = new Date(message.dateCreate)

  const confirmed = confirm.find(item => item.key === message._key)

  const idUserMes = message.author._id

  return (
    <ul className={cn()}>
      <li className={cn('text', message.author._id === user._id ? 'author' : '')}>
        {message.author._id === user._id && <div className={cn('confirm')}>{confirmed ? '✔️' : '⏳'}</div>}
        <div className={cn('user')} style={{color: `#1a${idUserMes[idUserMes.length - 1]}122`}}>{idUserMes === user._id ? user.username : message.author.username}</div>
        <div>{message.text}</div>
        <div className={cn('time')}>{date.toLocaleDateString('ru-Ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
      </li>
    </ul>
  )
}

export default memo(ItemChat)