import React, {useEffect, useState} from 'react'
import axios from 'axios'
const { kakao } = window

const KakaoMap = ({walkLocationIds}) => {
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState(null)

  console.log(walkLocationIds)

  // Draw map for the first time only using useEffect hook.
  useEffect(() => {
    axios.get(`http://localhost:8080/locations/${walkLocationIds[0]}`)
    .then(res => {
      setCenter(res.data)
      return {lat: res.data.latitude, lon: res.data.longitude}
    })
  }, [])

  if (center === null) {
    return (
      <>Loading...</>
    )
  }

  console.log(center)

  const container = document.getElementById('map')
  const options = { 
    center: new kakao.maps.LatLng(center.lat, center.lon),
    level: 3
  }
  const kakaoMap = new kakao.maps.Map(container, options)
  setMap(kakaoMap)

  if (map === null) {
    <>Drawing maps...</>
  }

  return (
    // The map shows here, in a frame of size decribed in style tag below.
    <div id="map" style={{width:'500px', height:'400px'}}></div>
  )
}

export default KakaoMap