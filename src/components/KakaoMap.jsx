import React, {useEffect, useState} from 'react'
import axios from 'axios'
const { kakao } = window

const KakaoMap = ({walkLocationIds}) => {
  const [map, setMap] = useState(null)
  const [point, setPoint] = useState(null)

  console.log(walkLocationIds)
  console.log(walkLocationIds[0])

  useEffect(() => {
    axios
      .get(`http://localhost:8080/locations/${walkLocationIds[0]}`)
      .then(res => {
        console.log(res.data)
        setPoint({lat: res.data.latitude, lng: res.data.longitude})
        return res.data
      })
      .then(res => {
        const container = document.getElementById('map')
        const options = { 
          center: new kakao.maps.LatLng(res.latitude, res.longitude),
          level: 3
        }
        const kakaoMap = new kakao.maps.Map(container, options)
        const markerPosition  = new kakao.maps.LatLng(res.latitude, res.longitude)
        const marker = new kakao.maps.Marker({position: markerPosition})
        marker.setMap(kakaoMap)
      })
    
  }, [])

  if (point === null) {
    <>Drawing maps...</>
  }

  console.log('hello')
  console.log(map)

  return (
      // The map shows here, in a frame of size decribed in style tag below.
  <>
  

    <div id="map" style={{width:'500px', height:'400px'}}></div>
  </>
  )
}

export default KakaoMap