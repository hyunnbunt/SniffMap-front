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
  const [userDogList, setUserDogList] = useState(null)
  const [userDog, setUserDog] = useState({updated : false, dog : null})
  const [userDogFriends, setUserDogFriends] = useState(null)
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
  
  const getPromiseDogList = async () => {
    const res = await Promise.all(user.dogIds.map(dogId =>
        axios.get(`http://localhost:8080/dogs/${dogId}`)
    ))
    return res
}

  /* 
    The page showing is changing depend on what the currentMode value is. 
    Each component can set the page showing and the user who's logged in now and the dog chosen.
  */
  if (currentMode === "Login") {
    page = <Login baseURL={baseURL} getPromiseDogList={getPromiseDogList} userDogList={userDogList} setUserDogList={setUserDogList} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentMode = {setCurrentMode} user={user} setUser={setUser} userDog={userDog} setUserDog={setUserDog}/>
  }
  if (currentMode === "Neighbors") {
    page = <Neighbors setCurrentMode = {setCurrentMode} userDog={userDog} userDogFriends={userDogFriends} updateUserDog={updateUserDog} />
  }
  if (currentMode === 'Events') {
    page = <Events setCurrentMode = {setCurrentMode} userDog={userDog} />
  }
  if (currentMode === 'Friends') {
    page = <Friends currentMode={currentMode} updateUserDog={updateUserDog} userDogFriends={userDogFriends} setUserDogFriends={setUserDogFriends} setCurrentMode = {setCurrentMode} userDog={userDog} setUserDog={setUserDog} />
  }
  if (currentMode === 'MyPage') {
    page = <MyPage setLoggedIn={setLoggedIn} getPromiseDogList={getPromiseDogList} userDogList={userDogList} setUserDogList={setUserDogList} setCurrentMode = {setCurrentMode} user={user} userDog={userDog} setUser={setUser} setUserDog={setUserDog} />
  }

  return (
    <>
      <NavBar handleClicks={handleNavbarClicks} mode={mode} />
      { page }
    </>
  )
}

export default App