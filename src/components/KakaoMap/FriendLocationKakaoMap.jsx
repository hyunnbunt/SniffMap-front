import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DogRegistration from '../Login/DogRegistration'
const { kakao } = window

const FriendLocationKakaoMap = ({dog}) => {
  // const [kakaoMap, setKakaoMap] = useState(null)
  const [setBounds, setSetBounds] = useState(null)

  const baseURL = 'http://localhost:8080/'

  const getPosition = (dog) => {
    if (dog.walkLocations.length === 0) {
      return
    }
    return { title: dog.name, lat: dog.walkLocations[0].latitude, lng: dog.walkLocations[0].longitude }
  }

  useEffect(() => {
    const myPosition = getPosition(dog)
    const friendsPosition =  dog.friends.map(getPosition)
    const markerPositions = [myPosition, ...friendsPosition]
    console.log(markerPositions)
    const container = document.getElementById('map1')
    const options = {
      center: new kakao.maps.LatLng(markerPositions[0].lat, markerPositions[0].lng),
      level: 3
    }
    const kakaoMap = new kakao.maps.Map(container, options)
    const positions = markerPositions.map(markerPosition => {
      return { title: markerPosition.title, latlng: new kakao.maps.LatLng(markerPosition.lat, markerPosition.lng) }
    })
    console.log(positions)
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    const imageSize = new kakao.maps.Size(24, 35)
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
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
      <div id="map1" style={{ width: '500px', height: '400px' }}></div>
    </>
  )
}

export default FriendLocationKakaoMap