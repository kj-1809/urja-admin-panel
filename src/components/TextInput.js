import React from 'react'
import "./TextInput.css"
const TextInput = (props) => {
  return (
    <div className = "inputFieldContainer">
      <input className = "inputField" placeholder={props.placeholder}/>
    </div>
  )
}

export default TextInput