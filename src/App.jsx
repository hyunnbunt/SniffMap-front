import React, { useState } from 'react'
import Login from './components/Login'
import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'
import Friends from './components/Friends'
import MyPage from './components/MyPage'


const ActiveMenu = () => {
  console.log('menu button clicked')
  return (
    <>
      <button>Logout</button>
    </>
  )
}

const App = () => {

  /* Don't put component in state! 복잡해짐 */
  /* The index page is set to show Login form */

  const [currentMode, setCurrentMode] = useState('Login')
  const [user, setUser] = useState(null)
  const [userDog, setUserDog] = useState(null)
  // const [updated, setUpdated] = useState(false)
  
  const mode = [
    "Neighbors",
    "Events",
    "Friends",
    "MyPage"
  ]

  /* This function changes the currentMode string value when the button clicked. */
  const handleNavbarClicks = (n) => {
    setCurrentMode(n)
  }

  let page = null
  const [loggedOut, setLoggedOut] = useState(false)

  /* 
    The page showing is changing depend on what the currentMode value is. 
    Each component can set the page showing and the user who's logged in now and the dog chosen.
  */
  if (currentMode === "Login") {
    page = <Login loggedOut={loggedOut} setCurrentMode = {setCurrentMode} user={user} setUser={setUser} setUserDog={setUserDog} />
  }
  if (currentMode === "Neighbors") {
    page = <Neighbors setCurrentMode = {setCurrentMode} userDog={userDog} setUserDog={setUserDog} />
  }
  if (currentMode === 'Events') {
    page = <Events setCurrentMode = {setCurrentMode} userDog={userDog} />
  }
  if (currentMode === 'Friends') {
    page = <Friends currentMode={currentMode} setCurrentMode = {setCurrentMode} userDog={userDog} setUserDog={setUserDog} />
  }
  if (currentMode === 'MyPage') {
    page = <MyPage setLoggedOut={setLoggedOut} setCurrentMode = {setCurrentMode} user={user} userDog={userDog} setUser={setUser} setUserDog={setUserDog} />
  }

  return (
    <>
      <NavBar handleClicks={handleNavbarClicks} mode={mode} />
      { page }
    </>
  )
}

export default App