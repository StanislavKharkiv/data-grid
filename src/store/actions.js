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
