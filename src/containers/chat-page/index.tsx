import React, { memo, useCallback, useEffect, useState } from 'react'
import SideLayout from '../../components/side-layout'
import ChatWindow from '../../components/chat-window'
import TextArea from '../../components/text-area'
import useStore from '../../hooks/use-store'
import useSelector from '../../hooks/use-selector'
import ItemChat from '../../components/item-chat'

function ChatPage({}) {

  const store = useStore()

  const select = useSelector(state => ({
    token: state.session.token,
    socket: state.socket.Xsocket,
    auth: state.socket.auth,
    message: state.socket.messages,
    delivery: state.socket.deliveredMes,
    user: state.session.user,
  }))

  const callbacks = {
    send: useCallback((text) => store.actions.socket.send(text), [store])
  }

  useEffect(() => {
    const res  = store.actions.socket.newSocket(select.token)
    setTimeout(() => store.actions.socket.getAllMessages(), 1000)
    return () => store.actions.socket.close()
  },[])

  const renders = {
     message: useCallback(
          message => (
            <ItemChat
              message={message}
              user={select.user}
              confirm={select.delivery}
              link={`/profile/${message.author._id}`}
            />
          ),
          [select.user],
        ),
  }

  return (
    <SideLayout side='center' padding='medium'>
      <ChatWindow allMessages={select.message} 
                  renderItem={renders.message}/>
      <TextArea send={callbacks.send}/>
    </SideLayout>
  )
}

export default memo(ChatPage)