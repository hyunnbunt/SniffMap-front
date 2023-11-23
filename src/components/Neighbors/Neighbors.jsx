import React from 'react'
import { useEffect } from 'react'
import FriendLocationKakaoMap from './FriendLocationKakaoMap'
import NeighborDogsKakaoMap from './NeighborDogsKakaoMap'

const Neighbors = (props) => {

  const dog = props.user.selectedDog
  
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