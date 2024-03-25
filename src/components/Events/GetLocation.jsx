import React, { useEffect, useState } from 'react'
const { kakao } = window

const GetLocation = ({ eventCreateInfo, setEventCreateInfo }) => {
    const [currMarker, setCurrMarker] = useState(null)
    const [message, setMessage] = useState('')
    const [bounds, setSetBounds] = useState(null)

    console.log(currMarker)

    const displayMarker = (map, position) => {
        const marker = new kakao.maps.Marker({
            map: map,
            position: position
        })

        if (currMarker !== null) {
            currMarker.setMap(null)
        }
        marker.setMap(map)
        setCurrMarker(marker)
    }

    const addClickEvent = (map) => {
        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            const latlng = mouseEvent.latLng
            setEventCreateInfo({
                ...eventCreateInfo,
                latitude: latlng.getLat(),
                longitude: latlng.getLng()
            })
            setMessage(`Event here? lat: ${latlng.getLat()}, lng: ${latlng.getLng()}`)
            const position = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng())
            displayMarker(map, position)
        })
    }

    const initializeMap = (container) => {
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        setSetBounds(new kakao.maps.LatLngBounds())
        console.log(new kakao.maps.LatLngBounds())
        const kakaoMap = new kakao.maps.Map(container, options)
        return kakaoMap
    }

    const markCurrPosition = (position, map) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        console.log(bounds)
        bounds.extend(position)
        map.setBounds(bounds)
        setMessage(`Are you here? lat: ${lat}, lng: ${lng}`)
        displayMarker(map, new kakao.maps.LatLng(lat, lng))
    }

    useEffect(() => {
        const container = document.getElementById('map')
        const kakaoMap = initializeMap(container)
        addClickEvent(kakaoMap)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => markCurrPosition(position, kakaoMap))
        } else {
            const locPosition = options.center
            const message = 'Can\'t use geolocation'
            displayMarker(kakaoMap, locPosition, message)
        }

    }, [])
    return (
        <>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
            <div>
                {message}
            </div>
        </>
    )
}

export default GetLocation

