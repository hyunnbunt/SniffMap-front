import React, {useEffect, useState} from 'react'
const { kakao } = window

const KakaoMap = () => {
  const [map, setMap] = useState(null)

  // Draw map for the first time only using useEffect hook.
  useEffect(() => {
    const container = document.getElementById('map')
    const options = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }
    const kakaoMap = new kakao.maps.Map(container, options)
    setMap(kakaoMap)
  }, [])

  return (
    // The map shows here, in a frame of size decribed in style tag below.
    <div id="map" style={{width:'500px', height:'400px'}}></div>
  )
}

export default KakaoMap