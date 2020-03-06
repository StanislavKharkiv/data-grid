const state = {
  loading: true,
}

export default function rootReducer(store = state, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...store,
        users: action.payload,
      }
    case 'IS_LOADING':
      return {
        ...store,
        loading: action.payload,
      }
    default:
      return store
  }
}
