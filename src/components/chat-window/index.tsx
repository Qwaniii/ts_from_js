import React, { memo, useEffect, useRef } from 'react'
import 'style.css'
import { cn as bem } from '@bem-react/classname'
import ItemChat from '../item-chat';

function ChatWindow({ allMessages, renderItem}) {

  const scrollDown = useRef<HTMLInputElement>(null)

  useEffect(() => {
    lastMessageScroll()
  },[])

  function lastMessageScroll() {
    if (!scrollDown.current) return ; 
    scrollDown.current.scrollIntoView({
        behavior: 'auto',
        block: 'end',
    });
}

  const cn = bem('ChatWindow');

  return (
    <ul className={cn()}>
        {allMessages.map(item => (
          <li key={item._id}>
            {renderItem(item)}
          </li>
          ))}
      <div ref={scrollDown}></div>
    </ul >
  )
}

export default memo(ChatWindow)