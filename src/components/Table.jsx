import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sortColumn } from '../store/actions'
import store from '../store/store'
import arrow from '../img/arrow.png'
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
  }

  handleClick = e => {
    const name = e.target.closest('th').getAttribute('data-name')
    this.props.sortColumn(store.getState(), name)
    this.setState({ isSorted: name })
  }

  render() {
    console.log(store.getState())

    const { users, isArrowDown } = this.props
    console.log('arrow', isArrowDown)
    const table = users.map(({ id, name, email, address, phone, website, status, date }) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{parseAddress(address)}</td>
        <td>{_.replace(phone, ' x', '-')}</td>
        <td>{website}</td>
        <td style={status ? { color: 'green' } : { color: 'red' }}>
          {status ? 'online' : 'offline'}
        </td>
        <td>{getDate(date)}</td>
      </tr>
    ))

    return (
      <table className="table">
        <caption className="caption">users table</caption>
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
                  <span>{el}</span>
                  <img className={isArrowDown ? null : 'up'} src={arrow} alt="^" />
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
  sortColumn: PropTypes.func,
  isArrowDown: PropTypes.bool,
}

const mapTateToProps = store => {
  return {
    users: store.users,
    isArrowDown: store.isSortDirectionDown,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sortColumn: (state, name) => dispatch(sortColumn(state, name)),
  }
}

const Table = connect(mapTateToProps, mapDispatchToProps)(Table_)

export default Table
