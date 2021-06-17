import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '50px',
        height: '30px',
        display: 'block',
        margin: 'auto'
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
