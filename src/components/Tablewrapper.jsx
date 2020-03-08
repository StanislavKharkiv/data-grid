import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import faker from 'faker'
import { addUsersToState, isLoading } from '../store/actions'

import Table from './Table'
import Spinner from './Spinner'

function addUsers() {
  const usersAll = 10
  const arr = []
  for (let i = 1; i <= usersAll; i++) {
    const user = faker.helpers.userCard()
    const dateUser = faker.date.past(2)
    user.active = faker.random.boolean()
    user.dateRegistration = dateUser.toString()
    user.getTime = Date.parse(dateUser)
    user.id = i
    arr.push(user)
  }
  return arr
}

class TableWrapper_ extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.addUsersToStore(addUsers())
      this.props.isLoading()
    }, 150)
  }

  render() {
    const { users, loading } = this.props
    console.log(users)
    return (
      <div>
        <h1>Table</h1>
        <div>{loading ? <Spinner /> : <Table users={users} />}</div>
      </div>
    )
  }
}

const mapTateToProps = store => {
  return {
    users: store.users,
    loading: store.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUsersToStore: arr => dispatch(addUsersToState(arr)),
    isLoading: () => dispatch(isLoading()),
  }
}

TableWrapper_.propTypes = {
  addUsersToStore: PropTypes.func,
  users: PropTypes.array,
  isLoading: PropTypes.func,
  loading: PropTypes.bool,
}
const TableWrapper = connect(mapTateToProps, mapDispatchToProps)(TableWrapper_)

export default TableWrapper
