const state = {
  loading: true,
  isSortDirectionDown: false,
  users: [],
}

export default function rootReducer(store = state, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...store,
        users: action.payload,
        allUsers: action.payload,
      }
    case 'IS_LOADING':
      return {
        ...store,
        loading: action.payload,
      }
    case 'DATA_SORT':
      return {
        ...store,
        users: action.payload,
        isSortDirectionDown: !store.isSortDirectionDown,
      }
    case 'SEARCH_BY_ALL':
      return {
        ...store,
        users: action.payload,
      }
    default:
      return store
  }
}
