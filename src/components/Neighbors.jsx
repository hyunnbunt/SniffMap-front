import React from 'react'
import { useEffect } from 'react'
import FriendLocationKakaoMap from './KakaoMap/FriendLocationKakaoMap'
import NeighborDogsKakaoMap from './KakaoMap/NeighborDogsKakaoMap'

const Neighbors = (props) => {

  const dog = props.user.dogs[props.selectedDogIndex]
  
  return (
    <>
      <h1>Your dog's friends' walk here:</h1>
      <FriendLocationKakaoMap dog={dog} />
      <h1>Your neighbor dogs walk here:</h1>
      <NeighborDogsKakaoMap dog={dog} />
    </>
  )
}

export default Neighbors