import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchByAllColumn } from '../store/actions'

function Search_(props) {
  const [value, setValue] = useState('')
  function handleChangeInput(e) {
    setValue(e.target.value.trim())
  }
  function handleClickButton() {
    props.search(value)
  }
  return (
    <div className="search">
      <span>Search: </span>
      <input className="search__input" type="text" onChange={handleChangeInput} />
      <button className="search__btn" onClick={handleClickButton}></button>
    </div>
  )
}

Search_.propTypes = {
  search: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    search: inputValue => dispatch(searchByAllColumn(inputValue)),
  }
}

const Search = connect(null, mapDispatchToProps)(Search_)
export default Search
