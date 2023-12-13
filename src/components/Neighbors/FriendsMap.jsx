import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { NeighborsContext } from './Neighbors'
import { AppContext } from '../../App'

const FriendsMap = () => {
    const appContext = useContext(AppContext)
    const nContext = useContext(NeighborsContext)
    const myDog = appContext.myDog

    // const getFriendsMarkers = (myDog) => {
    //     const myPosition = values.getPosition(myDog)
    //     const friendsPosition =  dog.friends.map(values.g    etPosition)
    //     return [myPosition, ...friendsPosition]
    // }

    useEffect(() => {
        const container = document.getElementById('map')
        const kakaoMap = nContext.drawMap(container)
        const bounds = new kakao.maps.LatLngBounds()
        nContext.drawDogMarker(myDog, kakaoMap, bounds)
        for (let friend in myDog.friends) {
            nContext.drawDogMarker(kakaoMap, friend)
        }
    }, [])

    return (
        <>
            <div id='map' style={{ width: '500px', height: '400px' }}></div>
        </>
    )
}

export default FriendsMap