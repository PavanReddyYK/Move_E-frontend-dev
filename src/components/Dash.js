import React from 'react'
import { useParams } from 'react-router-dom'

const Dash = () => {
  let {token} = useParams()
  sessionStorage.setItem('token',token)
  return (
    <div>Dash
      <h5>token: {token}</h5>
    </div>
  )
}

export default Dash