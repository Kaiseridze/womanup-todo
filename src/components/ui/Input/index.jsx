import React from 'react'
import './Input.style.less'
/**
 * @component Input
 * @param {object} props Object of props 
 * @param {string} props.placeholder - Accepts text into an input placeholder
 * @param {string} props.value - Accepts a string value in an input form
 * @param {function} props.onChange - Accepts a function in onChange to manage input
 * @returns {Component} Input as Component
 */
const Input = ({placeholder, value, onChange}) => {
  return (
    <input className='input' onChange={onChange} value={value} type="text" placeholder={placeholder} />
  )
}

export default Input