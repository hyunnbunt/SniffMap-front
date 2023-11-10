import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Neighbors from './components/Neighbors'
import Events from './components/Events'
import Friends from './components/Friends'
import MyPage from './components/MyPage'
import Update from './components/Update'

const App = () => {

  /* Don't put component in state! 복잡해짐 */

  const [currentMode, setCurrentMode] = useState('Login')
  const [user, setUser] = useState(null)
  const [loginInput, setLoginInput] = useState({email:"", pw:""})
  const [selectedDogIndex, setSelectedDogIndex] = useState(null)
  const [loggedOut, setLoggedOut] = useState(false)
  
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

  const updateUser = async () => {
    const loginURL = baseURL + 'users/login'
    console.log(loginInput)
    const res = await axios.post(loginURL, loginInput)
    if (res.status === 200) {
        setUser(res.data)
    } else {
      setCurrentMode("Login")
    }
  }

//   const updateUserDog = async () => {
//     if (!userDog.updated) {
//       const res = await axios.get(baseURL + `dogs/${userDog.dog.id}`)
//       if (res.status === 200) {
//         const updatedDog = {updated : true, dog : res.data}
//         setUserDog(updatedDog)
//         return updatedDog
//       }
//       return null
//     }
//     return userDog
//   }
  
//   const getPromiseDogList = async () => {
//     const res = await Promise.all(user.dogIds.map(dogId =>
//         axios.get(`http://localhost:8080/dogs/${dogId}`)
//     ))
//     return res
// }

  /* 
    The page showing is changing depend on what the currentMode value is. 
    Each component can set the page showing and the user who's logged in now and the dog chosen.
  */
  if (currentMode === "Login") {
    page = <Login loginInput={loginInput} setLoginInput={setLoginInput} baseURL={baseURL} updateUser={updateUser} user={user} setUser={setUser} setSelectedDogIndex={setSelectedDogIndex} setCurrentMode={setCurrentMode} />
  }
  if (currentMode === "Neighbors") {
    page = <Neighbors baseURL={baseURL} setCurrentMode = {setCurrentMode} user={user} selectedDogIndex={selectedDogIndex} />
  }
  if (currentMode === 'Events') {
    page = <Events setCurrentMode = {setCurrentMode} userDog={userDog} />
  }
  if (currentMode === 'Friends') {
    page = <Friends setCurrentMode = {setCurrentMode} selectedDogIndex={selectedDogIndex} user={user} />
  }
  if (currentMode === 'MyPage') {
    page = <MyPage updateUser={updateUser} setSelectedDogIndex={setSelectedDogIndex} setLoggedOut={setLoggedOut} setCurrentMode = {setCurrentMode} setUser={setUser} user={user} selectedDogIndex={selectedDogIndex} />
  }
  if (currentMode === 'Update') {
    page = <Update updateUser={updateUser} setCurrentMode={setCurrentMode} user={user} selectedDogIndex={selectedDogIndex}/>
  }

  return (
    <>
      <NavBar handleClicks={handleNavbarClicks} mode={mode} />
      { page }
    </>
  )
}

export default App