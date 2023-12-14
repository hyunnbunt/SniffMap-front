import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { NeighborsContext } from './Neighbors'

const FriendsMap = ({myDog}) => {
    const neighborsContext = useContext(NeighborsContext)
    const [setBounds, setSetBounds] = useState(null)

    const extendBounds = (map, bounds, markerPosition) => {
        bounds.extend(markerPosition)
        setSetBounds(map.setBounds(bounds))
    }

    useEffect(() => {
        const container = document.getElementById('friendsMap')
        const centerPosition = neighborsContext.getFirstWalkLocation(myDog)
        const kakaoMap = neighborsContext.drawMap(container, centerPosition)
        const bounds = new kakao.maps.LatLngBounds()
        const centerTitle = myDog.name
        const centerMarkerInfo = neighborsContext.drawLocationMarker(centerPosition, centerTitle, kakaoMap)
        extendBounds(kakaoMap, bounds, centerMarkerInfo.position)
        console.log(myDog.friends)
        for (let friend of myDog.friends) {
            const location = neighborsContext.getFirstWalkLocation(friend)
            const title = friend.name
            const markerInfo = neighborsContext.drawLocationMarker(location, title, kakaoMap)
            extendBounds(kakaoMap, bounds, markerInfo.position)
        }
    }, [])

    return (
        <>
            <div id='friendsMap' style={{ width: '500px', height: '400px' }}></div>
        </>
    )
}

export default FriendsMap