import React, { useState, createContext } from 'react'
import axios from 'axios'
import Login from './components/Login/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors/Neighbors'
import Events from './components/Events/Events'
import Friends from './components/Friends/Friends'
import MyPage from './components/MyPage/MyPage'

export const AppContext = createContext()

const App = () => {

  /* Don't put component in state! */
  const [currentMode, setCurrentMode] = useState('Login')
  const [loginMsg, setLoginMsg] = useState('')
  const [myDog, setMyDog] = useState(null)
  const [user, setUser] = useState(
    {
      loginInfo: null,
      userData: null,
      selectedDogId: null,
      loggedOut: false
    }
  )
  const serverURL = 'http://localhost:8080'

  /* It changes the currentMode string value when the button clicked. */
  const handleNavbarClicks = (n) => {
    setCurrentMode(n)
  }

  const updateUserData = (userData, loginInput) => {
    if (loginInput === null || loginInput === undefined) {
      user.loggedOut = true
      setUser(null)
      setLoginMsg("Wrong access. Login again.")
      setCurrentMode("Login")
    }
    if (user.loginInfo.email === loginInput.email && user.loginInfo.pw === loginInput.pw) {
      setUser({
        ...user,
        userData: userData
      })
    }
  }

  const loginRequestToServer = async (loginInfo) => {
    const loginURL = `${serverURL}/users/login`
    try {
      const res = await axios.post(loginURL, loginInfo)
      return res.data
    } catch (error) {
      console.log(error.response)
      return null
    }
   
  }

  const loginError = () => {
    setUser({
      ...user, 
      loginInfo: {
        email: '',
        pw: ''
      }
    })
    setLoginMsg('Wrong email or password, try again.')
    setCurrentMode('Login')
  }

  const login = async (loginInput) => {
    const response = await loginRequestToServer(loginInput)
    if (response !== null) {
      setUser({
        ...user,
        loginInfo: loginInput,
        userData: response
      })
    } else {
      loginError()
    }
  }

  const updateUser = async () => {
    const response = await loginRequestToServer(user.loginInfo)
    if (response !== null) {
      updateUserData(response, user.loginInfo)
      return true
    } 
    return false
  }

  const getDog = () => {
    console.log(user)
    return user.userData.dogs.find(dog=> dog.id === user.selectedDogId)
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
      <Login loginMsg={loginMsg}/>
  }
  if (currentMode === 'Neighbors') {
    page =
      <Neighbors/>
  }
  if (currentMode === 'Events') {
    page =
      <Events/>
  }
  if (currentMode === 'Friends') {
    page =
      <Friends/>
  }
  if (currentMode === 'MyPage') {
    page =
      <MyPage/>
  }

  return (
    <>

      <NavBar mode={mode} handleClicks={handleNavbarClicks} />
      <div>
        <AppContext.Provider value={{ serverURL, user, myDog, setMyDog, getDog, login, updateUserData, updateUser, setCurrentMode, setUser, requestLogin: loginRequestToServer }}>
          {page}
        </AppContext.Provider>
      </div>

    </>
  )
}

export default App