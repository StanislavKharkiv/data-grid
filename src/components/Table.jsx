import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sortUsersByDate, sortUsersByState } from '../store/actions'
import store from '../store/store'
import * as _ from 'lodash'

function parseAddress(address) {
  return (
    <>
      <div>{address.city}</div>
      <div>{address.street}</div>
      <div>{address.zipcode}</div>
    </>
  )
}
function getDate(time) {
  const date = new Date(time).toLocaleString()
  return date.slice(0, date.indexOf(','))
}

const tableHeaders = ['name', 'email', 'address', 'phone', 'website', 'status', 'date']

class Table_ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedBy: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const name = e.target.getAttribute('data-name')
    if (name === 'date') this.props.sortUsersByDate()
    if (name === 'status') this.props.sortUsersByState()
    this.setState({ isSorted: name })
  }

  render() {
    const { users } = this.props
    const table = users.map(({ id, name, email, address, phone, website, active, getTime }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{parseAddress(address)}</td>
        <td>{_.replace(phone, ' x', '-')}</td>
        <td>{website}</td>
        <td>{active ? 'online' : 'offline'}</td>
        <td>{getDate(getTime)}</td>
      </tr>
    ))

    return (
      <table className="table">
        <caption>users table</caption>
        <tbody>
          <tr className="table__header">
            {tableHeaders.map((el, i) => {
              return (
                <th
                  key={i}
                  data-name={el}
                  onClick={this.handleClick}
                  className={el === this.state.isSorted ? 'active' : ''}
                >
                  {el}
                </th>
              )
            })}
          </tr>
          {table}
        </tbody>
      </table>
    )
  }
}

Table_.propTypes = {
  users: PropTypes.array.isRequired,
  sortUsersByDate: PropTypes.func,
  sortUsersByState: PropTypes.func,
}

const mapTateToProps = store => {
  return {
    users: store.users,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sortUsersByDate: () => dispatch(sortUsersByDate(store)),
    sortUsersByState: () => dispatch(sortUsersByState(store)),
  }
}

const Table = connect(mapTateToProps, mapDispatchToProps)(Table_)

export default Table
