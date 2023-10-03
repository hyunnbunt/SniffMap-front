import React from 'react'

const NavBar = ({handleClicks, mode}) => {
  return (
    <>
      {mode.map(m => <button key={m} onClick={() => handleClicks(m)}>{m}</button>)}
    </>
  )
}

export default NavBar