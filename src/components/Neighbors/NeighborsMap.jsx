import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { NeighborsContext } from './Neighbors'
import { AppContext } from '../../App'

const NeighborsMap = ({myDog}) => {    
    const neighborsContext = useContext(NeighborsContext)
    const appContext = useContext(AppContext)

    const [setBounds, setSetBounds] = useState(null)

    const getAllNeighbors = async () => {
        const response = await axios.get(`${appContext.serverURL}/locations`)
        return response.data
    }

    const extendBounds = (map, bounds, markerPosition) => {
        bounds.extend(markerPosition)
        setSetBounds(map.setBounds(bounds))
    }

    useEffect(() => {
        const container = document.getElementById('neighborsMap')
        const centerPosition = neighborsContext.getFirstWalkLocation(myDog)
        const kakaoMap = neighborsContext.drawMap(container, centerPosition)
        const bounds = new kakao.maps.LatLngBounds()
        const centerMarkerInfo = neighborsContext.drawLocationMarker(centerPosition, myDog, kakaoMap)
        extendBounds(kakaoMap, bounds, centerMarkerInfo.position)
        const neighborsPromise = getAllNeighbors()
        neighborsPromise.then(neighbors => {
            for (let neighbor of neighbors) {
                const markerInfo = neighborsContext.drawLocationMarker(neighbor, neighborsContext.getFirstWalkingDog(neighbor), kakaoMap)
                extendBounds(kakaoMap, bounds, markerInfo.position)
            }
        })
    }, [])

    return (
        <>neighbors
            <div id='neighborsMap' style={{ width: '500px', height: '400px' }}></div>
        </>
    )
}

export default NeighborsMap