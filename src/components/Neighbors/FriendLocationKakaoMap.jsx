import React, { useContext, useEffect, useState } from 'react'
import DogRegistration from '../Login/DogRegistration'
import { NeighborsContext } from './Neighbors'
const { kakao } = window

const FriendLocationKakaoMap = ({dog}) => {
  const values = useContext(NeighborsContext)
  
  const getFriendsMarkerPositions = (dog) => {
    const myPosition = values.getPosition(dog)
    const friendsPosition =  dog.friends.map(values.getPosition)
    return [myPosition, ...friendsPosition]
  }

  useEffect(() => {
    const markerPositions = getFriendsMarkerPositions(dog)
    values.drawMapAndMarkers(document.getElementById('map'), markerPositions)

    // for (let i = 0; i < positions.length; i++) {
    //   const marker = new kakao.maps.Marker({
    //     map: kakaoMap, // 마커를 표시할 지도
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //     image: markerImage // 마커 이미지 
    //   })
    //   marker.setMap(kakaoMap)
    //   bounds.extend(positions[i].latlng)
    // }
    setSetBounds(() => {
      kakaoMap.setBounds(bounds)
    })
  }, [])

  if (dog.walkLocations.length === 0) {
    return (
      <DogRegistration />
    )
  }

  return (
    <>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
    </>
  )
}

export default FriendLocationKakaoMap