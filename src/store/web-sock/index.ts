import itemBasket from "../../components/item-basket";
import uniqKey from "../../utils/uniq-key";
import StoreModule from "../module";

type MessageProps = {

    text: string
}

type WebSocketState = {
  messages: MessageProps[]
  auth: boolean
  Xsocket: {}
  deliveredMes: []
}

class WebSock extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): WebSocketState {
    return {
      messages: [],
      auth: false,
      Xsocket: {},
      deliveredMes: []
    };
  }

    newSocket(Xtoken): any {

    const socket =  this.services.websocket.socketUrl();


      socket.onopen = (e) => {
        console.log(e)
        console.log('socket is open, auth - true ')
        this.setState({
          ...this.getState(),
          socket: socket
        })

        socket.send(JSON.stringify({
          method: 'auth',
          payload: {
            token: Xtoken
          }
        }))

        // this.getAllMessages()
      }    



      socket.onmessage = (event) => {
        const mes = JSON.parse(event.data)
        console.log('get message ', mes)
        switch(mes.method) {
          case 'auth': 
            this.setState({
              ...this.getState(),
              auth: mes.payload.result
            })
          break;
          case 'last':
            const allMessages = mes.payload.items.map(item => Object.assign({confirmed: true}, item))
            this.setState({
              ...this.getState(),
              messages: allMessages
            })
          break;
          case 'post':
            const delivery = this.getState().deliveredMes.find(item => item._key === mes.payload._key)
            this.setState({
              ...this.getState(),
              messages: delivery ? [...this.getState().messages, {...mes.payload, confirmed: true}] : [...this.getState().messages, mes.payload],
              deliveredMes: delivery ? [...this.getState().deliveredMes.filter(item => item.key !== mes.payload._key), {...delivery, confirmed: true}] : [...this.getState().deliveredMes]
            })
          break;
        }
      }

      socket.onclose = () => {
        console.log('WebSokcet is closed')
        this.newSocket(Xtoken)
      }
  }

    getAllMessages() {
      if(this.getState().auth) {

        this.getState().socket.send(JSON.stringify({
          method: 'last',
          payload: {
            fromDate: '2024-12-04T09:56:18.109Z'
          }
        }))
      }
    }



    send(message, author) {
      if(!message) {
        alert('Введите сообщение')
      } else {

        const key = uniqKey()
        this.getState().socket.send(JSON.stringify({
          method: 'post',
          payload: {
            _key: key, // любым способом генерируем уникальный ключ
            text: message
          }
        }))
        this.setState({
          ...this.getState(),
          deliveredMes: [...this.getState().deliveredMes, 
            {message, _key: key, author},
          ]
        })
      }
    }

    edit(newMessage, idMessage) {
      this.getState().socket.send(JSON.stringify({
        method: 'put',
        payload: {
          id: idMessage,
          text: newMessage
        }
      }))
      // this.setState({
      //   ...this.getState(),
      //   deliveredMes: [...this.getState().deliveredMes, 
      //     {message, _key: key, author},
      //   ]
      // })
    }

    close() {
      this.getState().socket.onclose = () => {
        console.log('WebSokcet is closed')
        this.setState({
          ...this.getState(),
          Xsocket: {}
        })
      }
    }

  
  
    
    // socket.send(JSON.stringify({
    //   method: 'post',
    //   payload: {
    //     _key: 'sdfgsdfjejjjjjjj', // любым способом генерируем уникальный ключ
    //     text: "Сообщение"
    //   }
    // }))

  }



  


export default WebSock