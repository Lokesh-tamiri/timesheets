import React from 'react'
import Login from '../../components/LoginPage'

const Presentation = ({ handleLogin }) => {
  return (
    <div className=''>
      <Login handleLogin={handleLogin}/>
    </div>
  )
}

export default Presentation
