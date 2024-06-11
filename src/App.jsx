import React, { useState, createContext } from 'react'
import axios from 'axios'
import Login from './components/Login/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors/Neighbors'
import Events from './components/Events/Events'
import Friends from './components/Friends/Friends'
import MyPage from './components/MyPage/MyPage'
import SignUp from './components/SignUp'
// import SigninRedirect from './components/SigninRedirect'

export const AppContext = createContext()

const App = () => {

  /* Don't put component in state! */
  const [currentMode, setCurrentMode] = useState('Login')
  console.log(currentMode)
  const [loginMsg, setLoginMsg] = useState('')
  const [user, setUser] = useState(
    {
      loginInfo: null,
      userData: null,
      selectedDogId: null,
      loggedOut: false
    }
  )
  const [token, setToken] = useState('')
  const serverURL = 'http://ec2-43-203-243-231.ap-northeast-2.compute.amazonaws.com:8085'
  const tokenHeader = {
    headers: {
      "Authorization": "Bearer " + token
    }
  }

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
    const loginURL = `${serverURL}/auth/login`
    try {
      const res = await axios.post(loginURL, loginInfo)
      return res.data
    } catch (error) {
      throw new Error(error.response)
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
    console.log(response);
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

  const updateUser = async (token) => {
    // const response = await loginRequestToServer(user.loginInfo)
    const userInfoURL = `${serverURL}/my`
    const response = await axios.get(userInfoURL, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    console.log("inside updateUser")
    console.log(response)
    // updateUserData(response)
    setUser({
      ...user,
      userData: response.data
    })
    // console.log()
    // if (response !== null) { 
    //   updateUserData(response, user.loginInfo)
    //   return true
    // } 
    // return false
  }

  const getDog = () => {
    console.log(user.selectedDogId)
    if (user.userData === null) {
      console.log("No user data registered.")
      return
    }
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
  if (currentMode === 'SignUp') {
    page = <SignUp/>
  }

  return (
    <>

      <NavBar mode={mode} handleClicks={handleNavbarClicks} />
      <div>
        <AppContext.Provider value={{ tokenHeader, setToken, token, user, serverURL, getDog, login, updateUserData, updateUser, setCurrentMode, setUser, requestLogin: loginRequestToServer }}>
          {page}
          {/* <SigninRedirect/> */}
        </AppContext.Provider>
      </div>

    </>
  )
}

export default App