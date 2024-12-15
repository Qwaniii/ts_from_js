import React, { memo, useState } from 'react'
import 'style.css'
import { cn as bem } from '@bem-react/classname'
import useStore from '../../hooks/use-store';


function TextArea({ send }) {
  const [text, setText] = useState('')

  const cn = bem('TextArea');

  const callbacks = {
    onsubmit: (e) => {
      e.preventDefault();
      send(text);
    }
  }

  return (
    <form className={cn()} onSubmit={(e) => callbacks.onsubmit(e)}>
      <input className={cn('input')} type='text' onChange={e => setText(e.target.value)} defaultValue={''} placeholder='Введите сообщение'/>
      <button className={cn('button')} type='submit'>отправить</button>
    </form>
  )
}

export default memo(TextArea)