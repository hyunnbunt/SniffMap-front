import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import KakaoMap from './KakaoMap'

const Dogs = () => {
  const [dogs, setDogs] = useState([])


  useEffect(() => {
    axios
    .get('http://localhost:8080/dogs')
    .then(res => {
      setDogs(res.data)
      }
    )
  }, [])
    return (
      <>
        <h1>Dogs</h1>
        <h2>
          {dogs.map(dog => dog.name + '(' + dog.age + ')' + ' ')}
        </h2>
      </>
    )
}

const Neighbors = (props) => {
  const [location, setLocation] = useState(null)
  const [locationURL, setLocationURL] = useState(null)
  console.log(props)

  useEffect(() => {
    if (props.userDog.updated) {
      axios.get(`http://localhost:8080/dogs/${props.userDog.dog.id}`).then(res => props.setUserDog({updated:false, dog : res.data}))
    } else {
      console.log("not updated")
    }
  })

  if (props.userDog.updated) {
    return (
      <>Loading...</>
    )
  }
  
  return (
    <>
      <KakaoMap friendIds={props.userDog.dog.friendIds} userDog={props.userDog} setUserDog={props.setUserDog} />
    </>
  )
}

export default Neighbors