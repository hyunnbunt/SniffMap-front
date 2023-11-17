import React, { useEffect } from 'react'
const { kakao } = window

const GetLocation = ({ setLocation }) => {

    const displayMarker = (locPosition, message) => {
        const marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        })
        const iwContent = message
        const iwRemovable = true
        const infoWindow = new kakao.maps.infoWindow({
            content: iwContent,
            removable: iwRemovable
        })
        infoWindow.open(map, marker)
        map.setCenter(locPosition)
    }

    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        const latlng = mouseEvent.LatLng
        marker.setPosition(latlng)
        setLocation({ lat: latlng.getLat(), lng: latlng.getLng() })
        const message = `The location is : lat(${latlng.getLat()}), lng(${latlng.getLng()})`
        const resultDiv = document.getElementById('clickLatlng')
        resultDiv.innerHTML = message;
    })

    useEffect(() => {

        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        const kakaoMap = new kakao.maps.Map(container, options)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                const locPosition = new kakao.maps.LatLng(lat, lng)
                const message = <div style={{ padding: '5px' }}>Are you here?</div>
                displayMarker(locPosition, message)
            })
        } else {
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667)
            const message = 'Can\'t use geolocation'
            displayMarker(locPosition, message)
        }

    }, [])

    return (
        <>
            <form>
                <div id="map" style={{ width: '500px', height: '400px' }}></div>
                <div id="clickLatlng"></div>
                <button type='submit'>Select location</button>
            </form>
        </>
    )
}

export default GetLocation

