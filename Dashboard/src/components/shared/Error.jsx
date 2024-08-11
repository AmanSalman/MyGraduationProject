import React from 'react'
function Error({message=" "}) {
  return (
    <div className='error-message'>Error: {message} </div>
  )
}

export default Error