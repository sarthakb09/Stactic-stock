import React from 'react'

function WelcomePage({user}) {
  return (
    <div>
        <h1>Welcome {user.email}</h1>
    </div>
  )
}

export default WelcomePage