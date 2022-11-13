import React from 'react'
import TextInput from "../components/TextInput"
import CustomButton from '../components/CustomButton'
import "./Login.css"

const Login = (props) => {
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <TextInput placeholder = "Email"/>
      <TextInput placeholder = "Password"/>
      <CustomButton>Login</CustomButton>
    </div>
  )
}

export default Login