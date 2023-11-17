import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors/Neighbors'
import Events from './components/Events/Events'
import Friends from './components/Friends/Friends'
import MyPage from './components/MyPage/MyPage'

const App = () => {

  /* Don't put component in state! */
  const [currentMode, setCurrentMode] = useState('Login')
  const [loginMsg, setLoginMsg] = useState('')
  const [user, setUser] = useState(
    {
      loginInfo: { email: '', pw: '' },
      userData: null,
      selectedDog: null,
      loggedOut: false
    }
  )
  const serverURL = 'http://localhost:8080'

  /* It changes the currentMode string value when the button clicked. */
  const handleNavbarClicks = (n) => {
    setCurrentMode(n)
  }

  /* It updates the user data with the response of a new login request to the server. 
  It doesn't update selectedDog. */
  const updateUserData = async (loginInput) => {
    const loginURL = `${serverURL}/users/login`
    const res = await axios.post(loginURL, loginInput)
    if (res.status === 200) {
      setUser(
        {
          ...user,
          loginInfo: loginInput,
          userData: res.data,
        }
      )
    } else {
      setLoginMsg('Error occured, please login again.')
      setCurrentMode('Login')
      return
    }
  }

  const updateSelectedDogData = () => {
    if (user.userData === null) {
      return
    }
    const selectedDogId = user.selectedDog.id
    for (var dog in user.userData.dogs) {
      if (dog.id === selectedDogId) {
        setUser({
          ...user,
          selectedDog: dog
        })
      }
    }
  }

  let page = null
  const mode = [
    'Neighbors',
    'Events',
    'Friends',
    'MyPage'
  ]

  if (currentMode === 'Login') {
    page =
      <Login
        user={user}
        setUser={setUser}
        updateUserData={updateUserData}
        loginMsg={loginMsg}
        serverURL={serverURL}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'Neighbors') {
    page =
      <Neighbors
        user={user}
        serverURL={serverURL}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'Events') {
    page =
      <Events
        user={user}
        updateUserData={updateUserData}
        updateSelectedDogData={updateSelectedDogData}
        setCurrentMode={setCurrentMode}
        serverURL={serverURL}
      />
  }
  if (currentMode === 'Friends') {
    page =
      <Friends
        user={user}
        setUser={setUser}
        updateUserData={updateUserData}
        updateSelectedDogData={updateSelectedDogData}
        setCurrentMode={setCurrentMode}
        serverURL={serverURL}
      />
  }
  if (currentMode === 'MyPage') {
    page =
      <MyPage
        user={user}
        setUser={setUser}
        updateUserData={updateUserData}
        updateSelectedDogData={updateSelectedDogData}
        setCurrentMode={setCurrentMode}
        serverURL={serverURL}
      />
  }

  return (
    <>
      <NavBar
        mode={mode}
        handleClicks={handleNavbarClicks}
      />
      <div>
        {page}
      </div>
    </>
  )
}

export default App