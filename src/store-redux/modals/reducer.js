// Начальное состояние
const initialState = {
  name: '',
  idProduct: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'modal/open':
      return { ...state, name: action.payload.name, idProduct: action.payload.idProduct };
    case 'modal/close':
      return { ...state, name: null, idProduct: initialState.idProduct || null };
    default:
      return state;
  }
}

export default reducer;
