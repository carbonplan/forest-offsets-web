const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return {
          ...state,
          selected: action.value
      }
    default:
      return state
  }
}

export default Reducer