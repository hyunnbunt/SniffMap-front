import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
const { kakao } = window

const KakaoMap = ({friendIds, userDog}) => {
  const [kakaoMap, setKakaoMap] = useState(null)

  const baseURL = 'http://localhost:8080/'

  const getMyLatLng = async () => {
    const response = await axios.get(baseURL+`locations/${userDog.walkLocationIds[0]}`)
    return {id: response.data.id, lat: response.data.latitude, lng: response.data.longitude}
  }

  const getFriendDogsLatLng = async () => {
    const friendDogs = await Promise.all(friendIds.map(friendId => axios.get(baseURL+`dogs/${friendId}`)))
    const friendDogLocations = await Promise.all(friendDogs.map(friendDog => {
      return axios.get(baseURL+`locations/${friendDog.data.walkLocationIds[0]}`)
    }))
    return friendDogLocations.map(friendDogLocation => {
      return {id: friendDogLocation.data.id, lat: friendDogLocation.data.latitude, lng: friendDogLocation.data.longitude}
    })
  }

  const getMarkerPoisitons = async () => {
    const my = [await getMyLatLng()]
    const friends = await getFriendDogsLatLng()
    return [...my, ...friends]
  }
  
  useEffect(() => {
    getMarkerPoisitons().then(res => {
      const demoLatLng = {demoLat : 37.4792683, demoLng : 127.0139129}
      const container = document.getElementById('map')
      const options = { 
        center: new kakao.maps.LatLng(demoLatLng.demoLat, demoLatLng.demoLng),
        level: 3
      }
      const kakaoMap = new kakao.maps.Map(container, options)
      const positions = res.map(position => {
        return {title: position.id, latlng: new kakao.maps.LatLng(position.lat, position.lng)}
      })
      console.log(positions)
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
      const imageSize = new kakao.maps.Size(24, 35)
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
      for (let i = 0; i < positions.length; i ++) {
        const marker = new kakao.maps.Marker({
          map: kakaoMap, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
        })
        marker.setMap(kakaoMap)
      }
    })
  }, [])


  return (
    <>
      <div id="map" style={{width:'500px', height:'400px'}}></div>
    </>
  )
}

export default KakaoMap