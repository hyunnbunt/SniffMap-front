import React from 'react'
import { useEffect } from 'react'
import KakaoMap from './KakaoMap'

const Neighbors = (props) => {

  useEffect(() => {
    props.updateUserDog()
  })

  if (!props.userDog.updated) {
    return (
      <>Loading...</>
    )
  }
  
  return (
    <>
      <KakaoMap userDogFriends={props.userDogFriends} userDog={props.userDog} updateUserDog={props.updateUserDog} />
    </>
  )
}

export default Neighbors