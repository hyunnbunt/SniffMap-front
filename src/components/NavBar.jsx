import React, { useContext } from 'react'
import { AppContext } from '../App'

const NavBar = ({mode, handleClicks}) => {
  return (
    <>

        {
          mode.map(m => <button key={m} onClick={() => handleClicks(m)}>{m}</button>)
        }
    </>
  )
}

export default NavBar