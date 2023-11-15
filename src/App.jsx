import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'
import Friends from './components/Friends'
import MyPage from './components/MyPage'
import UpdateUserPage from './components/UpdateUserPage'
import UpdateDogPage from './components/UpdateDogPage'

const App = () => {

  /* Don't put component in state! */
  const [currentMode, setCurrentMode] = useState('Login')
  const [loginMsg, setLoginMsg] = useState('')
  const [user, setUser] = useState(
    {
      loginInfo: { email: '', pw: '' },
      userData: null,
      selectedDogIndex: null,
      loggedOut: false
    }
  )
  // const [user, setUser] = useState(null)
  // const [loginInput, setLoginInput] = useState({ email: '', pw: '' })

  // const [selectedDogIndex, setSelectedDogIndex] = useState(null)
  // const [loggedOut, setLoggedOut] = useState(false)

  const serverURL = 'http://localhost:8080'

  /* It changes the currentMode string value when the button clicked. */
  const handleNavbarClicks = (n) => {
    setCurrentMode(n)
  }

  /* It updates the user data with the response of a new login request to the server. */
  const updateUser = async () => {
    const loginURL = `${serverURL}/users/login`
    console.log(loginInput)
    const res = await axios.post(loginURL, loginInput)
    if (res.status === 200) {
      setUser(res.data)
    } else {
      setLoginMsg('Error occured, please try again.')
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
        setCurrentMode={setCurrentMode}

      />
  }
  if (currentMode === 'Friends') {
    page =
      <Friends
        user={user}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'MyPage') {
    page =
      <MyPage
        user={user}
        setUser={setUser}
        updateUser={updateUser}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'UpdateUser') {
    page =
      <UpdateUserPage
        user={user}
        setUser={setUser}
        updateUser={updateUser}
        serverURL={serverURL}
        setCurrentMode={setCurrentMode}
      />
  }
  if (currentMode === 'UpdateDog') {
    page =
      <UpdateDogPage
        user={user}
        setUser={setUser}
        updateUser={updateUser}
        serverURL={serverURL}
        setCurrentMode={setCurrentMode}
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