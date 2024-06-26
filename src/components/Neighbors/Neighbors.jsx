import React from 'react'
import { createContext, useState, useContext } from 'react'
import FriendsMap from './FriendsMap'
import NeighborsMap from './NeighborsMap'
import WalkLocationRegistration from './WalkLocationRegistration'
import './neighbors.css'
import { AppContext } from '../../App'

export const NeighborsContext = createContext()

const Neighbors = () => {
  const appContext = useContext(AppContext)

  const [msg, setMsg] = useState('Loading user data...')

  const [walkLocationEmpty, setWalkLocationEmpty] = useState(appContext.getDog().walkingLocationIds.length === 0)

  const drawMap = (container, centerPosition) => {
    const options = {
      center: getKakaoLatLng(centerPosition),
      level: 3
    }
    return new kakao.maps.Map(container, options)
  }

  const drawLocationMarker = (location, dog, map) => {
    const markerInfo = {
      map: map,
      position: getKakaoLatLng(location),
      title: dog.name,
      image: getMarkerInsideImg(dog.dogProfileImageURL),
      clickable: true
    }
    const marker = new kakao.maps.Marker(markerInfo)
    marker.setMap(map)
    const infoWindow = getInfoWindow(markerInfo)
    handleMarkerClick(map, marker, infoWindow)
    return markerInfo
  }

  const handleMarkerClick = (map, marker, infoWindow) => {
    kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker)
    })
  }

  const getInfoWindow = (markerInfo) => {
    const iwPosition = markerInfo.position
    const greetingMsg = `Hello. I walk here!`
    const iwContent = `<div class='info-content' style={{padding : '5px'}}>${greetingMsg}</div>`
    const infoWindow = new kakao.maps.InfoWindow({
      position : iwPosition,
      content : iwContent
    })
    console.log(infoWindow)
    return infoWindow
  }

  const getMarkerInsideImg = (src) => {
    let imgSrc = src
    if (imgSrc === null || imgSrc === undefined || imgSrc === '') {
      // imgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
      imgSrc = 'https://firebasestorage.googleapis.com/v0/b/bunt-project-404405.appspot.com/o/default-dog-profile.jpg?alt=media&token=a032e37e-c5f6-44ca-a44f-765609bc7fc7'
    }
    const imageSize = new kakao.maps.Size(24, 24)
    return new kakao.maps.MarkerImage(imgSrc, imageSize)
  }

  const getKakaoLatLng = (position) => {
    return new kakao.maps.LatLng(position.latitude, position.longitude)
  }

  const getFirstWalkingDog = (location) => {
    console.log(location.walkingDogs[0])
    return location.walkingDogs[0]
  }

  const getFirstWalkLocation = (dog) => {
    return dog.walkLocations[0]
  }
  if (appContext.user.userData === null) {
    console.log("llll")
    console.log(appContext.user)
    return (
      <>{msg}</>
    )
  }
  if (appContext.user.userData.dogs.length === 0) {
    console.log("no dog friend")
    return (
      <>
      <>Find your friend!</>
      <NeighborsMap myDog={myDog} />
            </>

    )
  }
  if (walkLocationEmpty) {
    return (
      <WalkLocationRegistration setWalkLocationEmpty={setWalkLocationEmpty} />
    )
  }
  return (
    <>
      <NeighborsContext.Provider value={{ drawMap, drawLocationMarker, getFirstWalkingDog, getFirstWalkLocation }}>
        <h1>Your dog's friends' walk here:</h1>
        <FriendsMap myDog={myDog} />
        <NeighborsMap myDog={myDog} />
      </NeighborsContext.Provider>
    </>
  )
}

export default Neighbors