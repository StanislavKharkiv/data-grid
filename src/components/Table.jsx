import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sortColumn } from '../store/actions'
import store from '../store/store'
import arrow from '../img/arrow.png'
import { tableHeaders } from '../constants'
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

class Table_ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortedBy: false,
      isLoading: false,
    }
  }

  handleClick = e => {
    const name = e.target.closest('th').getAttribute('data-name')
    this.props.sortColumn(store.getState(), name)
    this.setState({ isSorted: name })
  }

  render() {
    let table
    const { users, isArrowDown, columnsShow } = this.props

    const tbHeaders = tableHeaders
      .filter(el => columnsShow[el])
      .map((el, i) => {
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
      })

    if (users.length === 0) {
      table = (
        <tr>
          <td colSpan="7" style={{ textAlign: 'center', fontSize: '20px' }}>
            No result...
          </td>
        </tr>
      )
    } else {
      table = users.map(({ id, name, email, address, phone, website, status, date }) => (
        <tr key={id}>
          {columnsShow.name ? <td>{name}</td> : null}
          {columnsShow.email ? <td>{email}</td> : null}
          {columnsShow.address ? <td>{parseAddress(address)}</td> : null}
          {columnsShow.phone ? <td>{_.replace(phone, ' x', '-')}</td> : null}
          {columnsShow.website ? <td>{website}</td> : null}
          {columnsShow.status ? (
            <td style={status ? { color: 'green' } : { color: 'red' }}>
              {status ? 'online' : 'offline'}
            </td>
          ) : null}
          {columnsShow.date ? <td>{getDate(date)}</td> : null}
        </tr>
      ))
    }

    return (
      <table className="table">
        <caption className="caption">users table</caption>
        <tbody>
          <tr className="table__header">{tbHeaders}</tr>
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
  columnsShow: PropTypes.object,
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
