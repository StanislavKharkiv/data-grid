import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchByAllColumn } from '../store/actions'
import { tableHeaders } from '../constants'

function Search_(props) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.addEventListener('keydown', e => {
      if (e.keyCode === 13) handleClickButtonSearch()
    })
  })
  function handleChangeInput(e) {
    setValue(e.target.value.trim())
  }
  function handleClickButtonSearch() {
    props.search(value)
  }
  function handleClickButtonReset() {
    setValue('')
    props.search('')
  }
  return (
    <div className="search-wrapper">
      <div className="search">
        <span className="search__title">Search: </span>
        <input
          className="search__input"
          type="text"
          value={value}
          ref={inputRef}
          onChange={handleChangeInput}
        />
        <button className="search__btn" onClick={handleClickButtonSearch}></button>
        <button className="search__btn" onClick={handleClickButtonReset}></button>
      </div>
      <div className="columns-switcher">
        {tableHeaders.map((el, i) => (
          <label key={i} className="columns-switcher__btn">
            <input type="checkbox" name={el} defaultChecked onChange={props.onChange} />
            <span>{el}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

Search_.propTypes = {
  search: PropTypes.func.isRequired,
  onChange: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
  return {
    search: inputValue => dispatch(searchByAllColumn(inputValue)),
  }
}

const Search = connect(null, mapDispatchToProps)(Search_)
export default Search
