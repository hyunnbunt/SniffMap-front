import React, { useEffect, useState } from 'react'
import DogRegistration from '../Login/DogRegistration'
const { kakao } = window

const FriendLocationKakaoMap = ({dog}) => {
  // const [kakaoMap, setKakaoMap] = useState(null)
  const [setBounds, setSetBounds] = useState(null)

  const getPosition = (dog) => {
    if (dog.walkLocations.length === 0) {
      return
    }
    return { title: dog.name, lat: dog.walkLocations[0].latitude, lng: dog.walkLocations[0].longitude }
  }

  const getFriendsMarkerPositions = () => {
    const myPosition = getPosition(dog)
    const friendsPosition =  dog.friends.map(getPosition)
    return [myPosition, ...friendsPosition]
  }

  const getKakaoLatLng = (position) => {
    return new kakao.maps.LatLng(position.lat, position.lng)
  }

  const drawMap = (centerPosition) => {
    const container = document.getElementById('map1')
    const options = {
      center : getKakaoLatLng(centerPosition),
      // center: new kakao.maps.LatLng(markerPositions[0].lat, markerPositions[0].lng),
      level: 3
    }
    return new kakao.maps.Map(container, options)
  }

  const makeMarkers = (markerPositions) => {
    return markerPositions.map(markerPosition => {
      return {title: markerPosition.title, latlng: getKakaoLatLng(markerPosition)}
    })
  }

  const getMarkerImage = (src) => {
    let imgSrc = src
    if (imgSrc === null || imgSrc === undefined) {
      imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    } 
    const imageSize = new kakao.maps.Size(24, 35)
    return new kakao.maps.MarkerImage(imgSrc, imageSize)
    }

  useEffect(() => {

    // const myPosition = getPosition(dog)
    // const friendsPosition =  dog.friends.map(getPosition)
    // const markerPositions = [myPosition, ...friendsPosition]
    // console.log(markerPositions)
    // const markerPositions = getFriendsMarkerPositions()
    // const container = document.getElementById('map1')
    // const options = {
    //   center: new kakao.maps.LatLng(markerPositions[0].lat, markerPositions[0].lng),
    //   level: 3
    // }
    // const kakaoMap = new kakao.maps.Map(container, options)

    // const positions = markerPositions.map(markerPosition => {
    //   return { title: markerPosition.title, latlng: getKakaoLatLng(markerPosition)}
    // })
    // console.log(positions)
    const markerPositions = getFriendsMarkerPositions()
    const kakaoMap = drawMap(markerPositions[0])
    makeMarkers(markerPositions)
    const markerImage = getMarkerImage()
    // const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    // const imageSize = new kakao.maps.Size(24, 35)
    // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    const bounds = new kakao.maps.LatLngBounds()
    // const iwContent = <div style={{ padding: '10px'}}>Hello</div>, iwRemoveable = true
    // const infowindow = new kakao.maps.InfoWindow({
    //   content : iwContent,
    //   removable : "iwRemoveable"
    // })
    for (let i = 0; i < positions.length; i++) {
      const marker = new kakao.maps.Marker({
        map: kakaoMap, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage // 마커 이미지 
      })
      marker.setMap(kakaoMap)
      bounds.extend(positions[i].latlng)
      // kakao.maps.event.addListener(marker, 'click', function() {
      //   // 마커 위에 인포윈도우를 표시합니다
      //   infowindow.open(map, marker);  
      // })
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