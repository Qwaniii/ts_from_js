import React, { memo, useEffect } from 'react'
import 'style.css'
import { cn as bem } from '@bem-react/classname'
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { Link } from 'react-router-dom';

function ItemChat({ message, user, confirm, link }) {

  const cn = bem('ItemChat');

  const date = new Date(message.dateCreate)

  const confirmed = confirm.find(item => item.key === message._key)

  const idUserMes = message.author._id

  return (
    <div className={cn()}>
      <div className={cn('text', message.author._id === user._id ? 'author' : '')}>
        {message.author._id === user._id && <div className={cn('confirm')}>{message.confirmed ? '✔️' : '⏳'}</div>}
        <Link to={link} className={cn('user')} style={{color: `#1a${idUserMes[idUserMes.length - 1]}122`}}>{idUserMes === user._id ? user.username : message.author.username}</Link>
        <div dangerouslySetInnerHTML={{__html: message.text}}></div>
        <div className={cn('time')}>{date.toLocaleDateString('ru-Ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
        {message.author._id === user._id && <div className={cn('edit')}>✏️</div>}
      </div>
    </div>
  )
}

export default memo(ItemChat)