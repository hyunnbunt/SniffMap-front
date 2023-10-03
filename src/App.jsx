import React, { useState } from 'react'
import Login from './components/Login'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'


const Friends = () => {
  return (
    <>
      <h1>This is Friends Page.</h1>
    </>
  )
}

const MyPage = () => {
  return (
    <>
      <h1>This is My Page.</h1>
    </>
  )
}

const ActiveMenu = () => {
  console.log('menu button clicked')
  return (
    <>
      <button>Logout</button>
    </>
  )
}



const App = () => {

  const [page, setPage] = useState(<Login />)
  const [activeMenu, setActiveMenu] = useState(null)

  const mode = [
    "Neighbors",
    "Events",
    "Friends",
    "MyPage"
  ]

  const handleMenuClick = () => {
    console.log('menu button clicked')
    setActiveMenu(<ActiveMenu />)
  }
  

  /* This function changes the page when the button clicked. */
  const handleClicks = (n) => {
    if (n === "Neighbors") {
      setPage(<Neighbors />)
    }
    if (n === 'Events') {
      setPage(<Events />)
    }
    if (n === 'Friends') {
      setPage(<Friends />)
    }
    if (n === 'MyPage') {
      setPage(<MyPage />)
    } 
  }

  return (
    <>
      <Menu onClick={handleMenuClick}/>
      <NavBar handleClicks={handleClicks} mode={mode}/>
      {page}
    </>
  )
}

export default App