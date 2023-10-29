import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
const { kakao } = window

const KakaoMap = ({friendIds, userDog}) => {
  const [map, setMap] = useState(null)
  const [myLocation, setMyLocation] = useState(null)
  const [friendLocations, setFriendLocations] = useState(null)
  const mapRef = useRef(null)

  const baseURL = 'http://localhost:8080/'

  const getMyLatLng = async () => {
    const response = await axios.get(baseURL+`locations/${userDog.walkLocationIds[0]}`)
    return {lat: response.data.latitude, lng: response.data.longitude}
  }

  const getFriendDogsLatLng = async () => {
    const friendDogs = await Promise.all(friendIds.map(friendId => axios.get(baseURL+`dogs/${friendId}`)))
    const friendDogLocations = await Promise.all(friendDogs.map(friendDog => {
      return axios.get(baseURL+`locations/${friendDog.data.walkLocationIds[0]}`)
    }))
    return friendDogLocations.map(friendDogLocation => {
      return {lat: friendDogLocation.data.latitude, lng: friendDogLocation.data.longitude}
    })
  }



  const drawMap = async () => {
    const my = await getMyLatLng()
    const friends = await getFriendDogsLatLng()
    console.log(my)
    console.log(friends)
    const container = mapRef.current
    // const container = document.getElementById('map')
    const options = { 
      center: new kakao.maps.LatLng(my.lat, my.lng),
      level: 3
    }
    const kakaoMap = new kakao.maps.Map(container, options)

    // const positions = friends.map(friendLocation => {
    //   return {title: friendLocation.id, latlng: new kakao.maps.LatLng(friendLocation.lat, friendLocation.lng)}
    // })
    // const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    // for (var i = 0; i < positions.length; i ++) {
    //   const imageSize = new kakao.maps.Size(24, 35)
    //   const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    //   const marker = new kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //     title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //     image : markerImage // 마커 이미지 
    //   })

    // }
    marker.setMap(kakaoMap)
  }
  
  useEffect(() => {
     drawMap().then(res => console.log("drew the"))
  }, [])

  if (myLocation === null || friendLocations === null) {
    return (
      <>Loading...</>
    )
  }

  return (
    // The map shows here, in a frame of size decribed in style tag below.
    <>
      <div ref={mapRef} style={{width:'500px', height:'400px'}}></div>
    </>
  )
}

export default KakaoMap