import React from 'react'
import PropTypes from 'prop-types'
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
export default function Table({ users }) {
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
        <tr>
          <th>name</th>
          <th>email</th>
          <th>address</th>
          <th>phone</th>
          <th>website</th>
          <th>status</th>
          <th>date</th>
        </tr>
        {table}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  users: PropTypes.array.isRequired,
}
