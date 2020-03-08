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

export function sortUsersByDate(store) {
  sortResult.reverse()
  const arr = [...store.getState().users]
  return {
    type: 'DATA_SORT_BY_DATE',
    payload: arr.sort((one, two) => {
      return one.getTime > two.getTime ? sortResult[0] : sortResult[1]
    }),
  }
}

export function sortUsersByState(store) {
  sortResult.reverse()
  const arr = [...store.getState().users]
  return {
    type: 'DATA_SORT_BY_STATUS',
    payload: arr.sort((one, two) => {
      return +one.active > +two.active ? sortResult[0] : sortResult[1]
    }),
  }
}
