import React, { useEffect, useState } from 'react'
const { kakao } = window

const GetLocation = ({ eventCreateInfo, setEventCreateInfo }) => {

    const [currMarker, setCurrMarker] = useState(null)
    const [message, setMessage] = useState('')
    const displayMarker = (eventMap, locPosition) => {

        const marker = new kakao.maps.Marker({
            map: eventMap,
            position: locPosition
        })

        




        marker.setMap(eventMap)

        if (currMarker !== null) {
            currMarker.setMap(null)
            setCurrMarker(null)
        }
        // if (marker === null) {
        //     marker = new kakao.maps.Marker({
        //         map: eventMap,
        //         position: locPosition
        //     })
        // }
        // } else {
        //     marker.n = locPosition
        // }

        // setClickedMarker(marker)
        // const iwContent = message
        // const iwRemovable = true
        // const infoWindow = new kakao.maps.infoWindow({
        //     content: iwContent,
        //     removable: iwRemovable
        // })

    


        // infoWindow.open(eventMap, marker)
        // kakaoMap.setCenter(locPosition)
    }

    const addClickEvent = (map) => {
        console.log(map)
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            if (currMarker !== null) {
                currMarker.setMap(null)
            }
            const latlng = mouseEvent.latLng
            setEventCreateInfo({
                ...eventCreateInfo,
                latitude: latlng.getLat(),
                longitude: latlng.getLng()
            })
            setMessage(`lat: ${latlng.getLat()}, lng: ${latlng.getLng()}`)
            displayMarker(kakaoMap, new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()))
        })
       
        // 클릭한 위도, 경도 정보를 가져옵니다 
    }

    const initializeMap = (container) => {
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        const kakaoMap = new kakao.maps.Map(container, options)
        return kakaoMap
    }

    const markCurrPosition = (position, map) => {
        console.log(position)
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const locPosition = new kakao.maps.LatLng(lat, lng)

        console.log(locPosition)
        const bounds = new kakao.maps.LatLngBounds()
        bounds.extend(locPosition)
        map.setBounds(bounds)
        setMessage(`Are you here? lat: ${lat}, lng: ${lng}`)
        // const message = <div style={{ padding: '5px' }}>Are you here?</div>
        displayMarker(map, locPosition)
    }



    useEffect(() => {
        const container = document.getElementById('map')
        const kakaoMap = initializeMap(container)
        addClickEvent(kakaoMap)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => markCurrPosition(position, kakaoMap))
        } else {
            const locPosition = options.center
            // new kakao.maps.LatLng(33.450701, 126.570667)
            const message = 'Can\'t use geolocation'
            displayMarker(kakaoMap, locPosition, message)
        }

    }, [])

    console.log(eventCreateInfo)

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

