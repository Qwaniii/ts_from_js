import StoreModule from '../module';
import codeGenerator from "../../utils/code-generator";
type ModalType = {
  id: string;
  name: string;
  close: (value: any) => void;
}
type ModalsStateType = {
  stack: ModalType[]
}

class ModalsState extends StoreModule {
  initState(): ModalsStateType {
    return {
      stack: [],
    };
  }

  open(name): number | any {
    return new Promise(resolve => {
      const {stack} = this.getState()
      const id = codeGenerator();
      this.setState({
        stack: [
          ...stack,
          {
            id,
            name,
            close: (value) => {
              resolve(value)
              const newStack = stack.filter(modal => modal.id !== id)
              this.setState({
                ...this.getState(),
                stack: newStack
              })
            }
          }
        ]
      })
    })
  }

  // close(id, result ) {
  //
  //   const {stack} = this.getState()
  //   const newStack = stack.filter(modal => modal.id !== id)
  //   this.setState({
  //     ...this.getState(),
  //     stack: newStack
  //   })
  //   const modalToClose = stack.find(modal => modal.id === id)
  //   if(modalToClose) modalToClose.close(result)
  // }

}

export default ModalsState;
