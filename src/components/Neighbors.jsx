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

const Neighbors = () => {
  return (
    <>
      <KakaoMap />
      <Dogs />
    </>
  )
}

export default Neighbors