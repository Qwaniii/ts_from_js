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

        if(this.getState().auth) {
          socket.send(JSON.stringify({
          method: 'last',
          payload: {
            fromDate: '2024-12-04T09:56:18.109Z'
          }
        }))
      }

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
            this.setState({
              ...this.getState(),
              messages: [...mes.payload.items.map(item => [...{...item, confirmed: true}])]
            })
          break;
          case 'post':
            const delivery = this.getState().deliveredMes.find(item => item.key === mes.payload._key)
            this.setState({
              ...this.getState(),
              messages: [...this.getState().messages, mes.payload],
              deliveredMes: delivery ? [...this.getState().deliveredMes.filter(item => item.key !== mes.payload._key), {...delivery, confirmed: true}] : [...this.getState().deliveredMes]
            })
        }
      }

      socket.onclose = () => {
        console.log('WebSokcet is closed')
        this.newSocket(Xtoken)
      }
  }

  //   auth(Xtoken) {
  //     // const socket =  this.services.websocket.socketUrl();
  //     this.getState().socket.onopen = (e) => {
  //       this.getState().socket.send(JSON.stringify({
  //         method: 'auth',
  //         payload: {
  //           token: Xtoken
  //         }
  //       }))

  //   }
  // }

    // getMessage() {
    //   let mes = ''
    //   this.getState().socket.message = function(event) {
    //     let message = JSON.parse(event.data);
    //     let res = message.payload.text
    //     mes = res
    //     return mes
    //   }
    //   this.setState({
    //     ...this.getState(),
    //     message: mes
    //   })
    //   console.log(mes)
    // }

    getAllMessages() {
      this.getState().socket.send(JSON.stringify({
        method: 'last',
        payload: {
          fromDate: '2024-12-04T09:56:18.109Z'
        }
      }))
    }



    send(message) {
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
            {message, key}
          ]
        })
      }
    }

    close() {
      this.getState().socket.close()
      this.setState({
        ...this.getState(),
        Xsocket: {}
      })
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