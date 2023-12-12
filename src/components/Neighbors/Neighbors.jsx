import React from 'react'
import { useContext } from 'react'
import FriendLocationKakaoMap from './FriendLocationKakaoMap'
import NeighborDogsKakaoMap from './NeighborDogsKakaoMap'
import { AppContext } from '../../App'

const Neighbors = () => {

  const values = useContext(AppContext)

  const dog = values.getDog()
  
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