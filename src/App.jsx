import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'
import Friends from './components/Friends'
import MyPage from './components/MyPage'

const App = () => {

  /* Don't put component in state! 복잡해짐 */

  const [currentMode, setCurrentMode] = useState('Login')
  const [user, setUser] = useState(null)
  const [userDog, setUserDog] = useState({updated : false, dog : null})
  const [loggedIn, setLoggedIn] = useState(false)
  
  let page = null
  const mode = [
    "Neighbors",
    "Events",
    "Friends",
    "MyPage"
  ]

  const baseURL = 'http://localhost:8080/'

  /* This function changes the currentMode string value when the button clicked. */
  const handleNavbarClicks = (n) => {
    setCurrentMode(n)
  }

  const updateUserDog = async () => {
    if (!userDog.updated) {
      const res = await axios.get(baseURL + `dogs/${userDog.dog.id}`)
      if (res.status === 200) {
        const updatedDog = {updated : true, dog : res.data}
        setUserDog(updatedDog)
        return updatedDog
      }
      return null
    }
    return userDog
  }

  /* 
    The page showing is changing depend on what the currentMode value is. 
    Each component can set the page showing and the user who's logged in now and the dog chosen.
  */
  if (currentMode === "Login") {
    page = <Login baseURL={baseURL} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentMode = {setCurrentMode} setUser={setUser} userDog={userDog} updateUserDog={updateUserDog} />
  }
  if (currentMode === "Neighbors") {
    page = <Neighbors setCurrentMode = {setCurrentMode} userDog={userDog} updateUserDog={updateUserDog} />
  }
  if (currentMode === 'Events') {
    page = <Events setCurrentMode = {setCurrentMode} userDog={userDog} />
  }
  if (currentMode === 'Friends') {
    page = <Friends currentMode={currentMode} updateUserDog={updateUserDog} setCurrentMode = {setCurrentMode} userDog={userDog} setUserDog={setUserDog} />
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