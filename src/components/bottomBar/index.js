import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const BottomBar = ({ children, cssClasses }) => (
  <div
    className={`bottom-bar fixed w-screen bg-white overflow-x-scroll shadow-opposite md:relative md:w-full md:bg-transparent md:mb-6 md:overflow-x-auto md:shadow-none ${cssClasses}`}
  >
    {children}
  </div>
)

BottomBar.propTypes = {
  cssClasses: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default BottomBar
