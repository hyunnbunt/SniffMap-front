import React, { useContext } from 'react'
import { AppContext } from '../App'

const NavBar = () => {
  return (
    <>
      <AppContext.Consumer>
        {(handleClicks, mode) => (
          mode.map(m => <button key={m} onClick={() => handleClicks(m)}>{m}</button>)
        )}
      </AppContext.Consumer>
    </>
  )
}

export default NavBar