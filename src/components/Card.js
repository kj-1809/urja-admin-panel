import React from 'react'
import "./Card.css"

export const Card = (props) => {
  return (
    <div className = "card-container">
      <h3>{props.title}</h3>
      <h1 className = {`${props.style} cardValue`}>{props.value}</h1>
    </div>
  )
}
