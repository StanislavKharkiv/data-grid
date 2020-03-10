import store from './store'

export function addUsersToState(users) {
  return {
    type: 'ADD_DATA',
    payload: users,
  }
}
export function isLoading() {
  return {
    type: 'IS_LOADING',
    payload: !store.getState().loading,
  }
}

let sortResult = [-1, 1]

export function sortColumn(state, name) {
  sortResult.reverse()
  const arr = [...state.users]
  return {
    type: 'DATA_SORT',
    payload: arr.sort((one, two) => {
      return one[name] > two[name] ? sortResult[0] : sortResult[1]
    }),
  }
}
