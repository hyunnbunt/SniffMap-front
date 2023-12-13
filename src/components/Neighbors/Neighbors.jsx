import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import FriendsMap from './FriendsMap'
import FriendLocationKakaoMap from './FriendLocationKakaoMap'
import NeighborDogsKakaoMap from './NeighborDogsKakaoMap'
import { AppContext } from '../../App'

export const NeighborsContext = createContext()

const Neighbors = () => {
  const [msg, setMsg] = useState('')
  const [setBounds, setSetBounds] = useState(null)
  
  const getPosition = (dog) => {
    if (dog.walkLocations.length === 0) {
      return null
    }
    return { title: dog.name, lat: dog.walkLocations[0].latitude, lng: dog.walkLocations[0].longitude }
  }

  const getKakaoLatLng = (position) => {
    console.log(position.latitude, position.longitude)
    return new kakao.maps.LatLng(position.latitude, position.longitude)
  }

  const drawMap = (container) => {
    const options = {
      center : getKakaoLatLng(myDog.walkLocations[0]),
      level: 3
    }
    console.log(myDog.walkLocations[0])
    console.log(options.center)
    return new kakao.maps.Map(container, options)
  }

  const drawDogMarker = (dog, map, bounds) => {
    console.log(dog.walkLocations[0])
    const markerPosition = getKakaoLatLng(dog.walkLocations[0])
    const markerInfo = {
      map: map,
      position: markerPosition,
      title: dog.name,
      image: getMarkerImage()
    }
    const marker = new kakao.maps.Marker(markerInfo)
    marker.setMap(map)
    bounds.extend(markerPosition)
  }

  const makeMarkers = (markerPositions) => {
    return markerPositions.map(markerPosition => {
      return {title: markerPosition.title, latlng: getKakaoLatLng(markerPosition)}
    })
  }

  const drawMapAndMarkers = (container, markerPositions) => {
    const kakaoMap = drawMap(container, markerPositions[0])
    makeMarkers(markerPositions)
    const markerImage = getMarkerImage()
    const bounds = new kakao.maps.LatLngBounds()
    for (let i = 0; i < positions.length; i++) {
      const marker = new kakao.maps.Marker({
        map: kakaoMap, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
      })
      marker.setMap(kakaoMap)
      bounds.extend(positions[i].latlng)
    }
  }

  const getMarkerImage = (src) => {
    let imgSrc = src
    if (imgSrc === null || imgSrc === undefined) {
      imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    } 
    const imageSize = new kakao.maps.Size(24, 35)
    return new kakao.maps.MarkerImage(imgSrc, imageSize)
  }
  
  return (
    <>
      <h1>Your dog's friends' walk here:</h1>
              {/* <FriendLocationKakaoMap dog={dog} />
        <h1>Your neighbor dogs walk here:</h1>
        <NeighborDogsKakaoMap dog={dog} /> */}
      <NeighborsContext.Provider value={{getPosition, drawDogMarker, drawMapAndMarkers, getKakaoLatLng, drawMap, makeMarkers, getMarkerImage}}>
        <FriendsMap />
      </NeighborsContext.Provider>
     
    </>
  )
}

export default Neighbors