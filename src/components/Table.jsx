import React from 'react'
import PropTypes from 'prop-types'

export default function Table({ users }) {
  return (
    <div>
      <span>{users[0].name}</span>
    </div>
  )
}

Table.propTypes = {
  users: PropTypes.array.isRequired,
}
