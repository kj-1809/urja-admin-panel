import React from 'react'
import "./Card.css"

export const Card = (props) => {
  return (
    <div className = "card-container">
      <h3>{props.title} (Last 30 days)</h3>
      <h1>{props.value}</h1>
    </div>
  )
}
