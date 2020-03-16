import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../store/store'

class Header_ extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__h1">Data grid</h1>
        <div className="header__users">
          {this.props.shownUsers} <span>users</span>
        </div>
      </header>
    )
  }
}

Header_.propTypes = {
  shownUsers: PropTypes.number,
}

const mapStateToProps = () => ({
  shownUsers: store.getState().users.length,
})

const Header = connect(mapStateToProps)(Header_)

export default Header
