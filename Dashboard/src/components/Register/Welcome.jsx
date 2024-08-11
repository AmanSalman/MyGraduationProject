import React from 'react'
import Logo from '../../assets/Logo.png';
import './Register.css'
function Welcome() {
  return (
    <div className="Welcome-wrapper">
            <img
              src={Logo}
              alt="logo"
              className="welcome-logo"
            />
            <div className="mediaQheader">
              <h1 className="Hello-wrapper">Hello Again!</h1>
              <h2 className="Welcome-back dancing-font">Welcome back</h2>
            </div>
          </div>
  )
}

export default Welcome