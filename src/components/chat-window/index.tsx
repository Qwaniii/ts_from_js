import React, { memo, useEffect, useRef } from 'react'
import 'style.css'
import { cn as bem } from '@bem-react/classname'
import ItemChat from '../item-chat';

function ChatWindow({ allMessages, user, confirm }) {

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
    <div className={cn()}>
      {allMessages.map(item => (
        <ItemChat key={item._id} 
                  message={item} 
                  user={user}
                  confirm={confirm}/>
      ))}
    <div ref={scrollDown}>©</div>
    </div >
  )
}

export default memo(ChatWindow)