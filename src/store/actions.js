import * as _ from 'lodash'
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
  const usersArr = [...state.users]
  return {
    type: 'DATA_SORT',
    payload: usersArr.sort((one, two) => {
      return one[name] > two[name] ? sortResult[0] : sortResult[1]
    }),
  }
}

export function searchByAllColumn(
  inputValue,
  iterableProperties = ['name', 'email', 'address', 'phone', 'website']
) {
  const usersArr = [...store.getState().allUsers]

  function filterUsers(inputValue, allUsers) {
    if (inputValue === '') return allUsers
    return allUsers.filter(userObj =>
      iterableProperties.some(property => {
        let result
        if (property === 'address') {
          const addressProperties = ['street', 'city', 'zipcode']
          result = addressProperties.some(el =>
            _.includes(_.lowerCase(userObj.address[el]), _.lowerCase(inputValue))
          )
          if (result) return true
        }
        result = _.includes(_.lowerCase(userObj[property]), _.lowerCase(inputValue))

        return result
      })
    )
  }

  return {
    type: 'SEARCH_BY_ALL',
    payload: filterUsers(inputValue, usersArr),
  }
}
