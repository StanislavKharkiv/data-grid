import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import faker from 'faker'
import { addUsersToState, isLoading } from '../store/actions'

import Header from './Header'
import Search from './Search'
import Table from './Table'
import Spinner from './Spinner'

function addUsers() {
  const usersAll = 1000
  const arr = []
  for (let i = 1; i <= usersAll; i++) {
    const user = faker.helpers.userCard()
    const dateUser = faker.date.past(2)
    user.status = faker.random.boolean()
    // user.dateRegistration = dateUser.toString()
    user.date = Date.parse(dateUser)
    user.id = i
    arr.push(user)
  }
  return arr
}

class TableWrapper_ extends Component {
  state = {
    columnsShow: {
      name: true,
      email: true,
      address: true,
      phone: true,
      website: true,
      status: true,
      date: true,
    },
  }

  componentDidMount() {
    setTimeout(() => {
      const usersArr = addUsers()
      this.users = usersArr
      this.props.addUsersToStore(usersArr)
      this.props.isLoading()
    }, 200)
  }
  handleCheckboxChange = e => {
    this.setState({ columnsShow: { ...this.state.columnsShow, [e.target.name]: e.target.checked } })
  }
  render() {
    const { loading } = this.props
    return (
      <div>
        <Header />
        <Search onChange={this.handleCheckboxChange} />
        <div>{loading ? <Spinner /> : <Table columnsShow={this.state.columnsShow} />}</div>
      </div>
    )
  }
}

const mapTateToProps = store => {
  return {
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
  isLoading: PropTypes.func,
  loading: PropTypes.bool,
}
const TableWrapper = connect(mapTateToProps, mapDispatchToProps)(TableWrapper_)

export default TableWrapper
