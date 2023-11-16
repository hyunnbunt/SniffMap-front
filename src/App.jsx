import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'
import Friends from './components/Friends'
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

  /* It updates the user data with the response of a new login request to the server. */
  const updateUser = async (loginInput) => {
    const loginURL = `${serverURL}/users/login`
    console.log(loginInput)
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
      setLoginMsg('Error occured, please try again.')
      setCurrentMode('Login')
    }
  }

  const updateSelectedDog = async () => {
    const dogRequestURL = `${serverURL}/dogs/${user.selectedDog.id}`
    const res = await axios.get(dogRequestURL)
    if (res.status === 200) {
      setUser(
        {
          ...user,
          selectedDog: res.data
        }
      )
    } else {
      setLoginMsg('Error occured, please login again.')
      setCurrentMode('Login')
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
        updateUser={updateUser}
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
        updateUser={updateUser}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'Friends') {
    page =
      <Friends
        user={user}
        setUser={setUser}
        updateUser={updateUser}
        setCurrentMode={setCurrentMode}
        serverURL={serverURL}
      />
  }
  if (currentMode === 'MyPage') {
    page =
      <MyPage
        user={user}
        setUser={setUser}
        updateUser={updateUser}
        updateSelectedDog={updateSelectedDog}
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