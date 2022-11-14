import React from 'react'
import "./TextInput.css"
const TextInput = (props) => {
  return (
    <div className = "inputFieldContainer">
      <input className = "inputField" placeholder={props.placeholder} onChange = {props.onChange} value = {props.value}/>
    </div>
  )
}

export default TextInput