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



  // useEffect(() => {
  //   axios.get(`http://localhost:8080/locations/${props.userDog.walkLocationIds[0]}`)
  //   .then(
  //     res => {
  //       console.log(res.data)
  //       setLocation({lat: res.data.latitude, lon: res.data.longitude})
  //     }
  //   )
  //   .then(
  //     setLocationURL(`https://map.kakao.com/link/map/${location.lat},${location.lon}`)
  //   )
  // }, [])

  // if (locationURL === null) {
  //   return (
  //     <>Loading...</>
  //   )
  // }
  return (
    <>
      <KakaoMap walkLocationIds={props.userDog.walkLocationIds}/>
    </>
  )
}

export default Neighbors