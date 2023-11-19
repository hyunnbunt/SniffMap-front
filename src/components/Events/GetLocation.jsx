import React, { useEffect, useState } from 'react'
const { kakao } = window

const GetLocation = ({ eventCreateInfo, setEventCreateInfo }) => {

    const [clickedMarker, setClickedMarker] = useState(null)
    const [message, setMessage] = useState('')

    const displayMarker = (eventMap, locPosition) => {
        clickedMarker

        const marker = new kakao.maps.Marker({
            map: eventMap,
            position: locPosition
        })
        console.log(marker)
        setClickedMarker(marker)
        // const iwContent = message
        // const iwRemovable = true
        // const infoWindow = new kakao.maps.infoWindow({
        //     content: iwContent,
        //     removable: iwRemovable
        // })
        marker.setMap(eventMap)
        // infoWindow.open(eventMap, marker)
        // kakaoMap.setCenter(locPosition)
    }

    // kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    //     const latlng = mouseEvent.LatLng
    //     marker.setPosition(latlng)
    //     setEventCreateInfo({ 
    //         ...setEventCreateInfo,
    //         lattitude: latlng.getLat(), 
    //         longitude: latlng.getLng() 
    //     })
    //     const message = `The location is : lat(${latlng.getLat()}), lng(${latlng.getLng()})`
    //     const resultDiv = document.getElementById('clickLatlng')
    //     resultDiv.innerHTML = message;
    // })




    // const handleMapClick = (e) => {
    //     console.log(mouseEvent)
    //     const latlng = e.mouseEvent
    //     clickedMarker.setPosition(latlng)
    //     setEventCreateInfo({
    //         ...setEventCreateInfo,
    //         lattitude: latlng.getLat(),
    //         longitude: latlng.getLng()
    //     })
    //     const message = `The location is : lat(${latlng.getLat()}), lng(${latlng.getLng()})`
    //     const resultDiv = document.getElementById('clickLatlng')
    //     resultDiv.innerHTML = message;
    // }

    useEffect(() => {
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        const bounds = new kakao.maps.LatLngBounds()
        const kakaoMap = new kakao.maps.Map(container, options)

        kakao.maps.event.addListener(kakaoMap, 'click', function (mouseEvent) {
            const latlng = mouseEvent.latLng
            setEventCreateInfo({
                ...eventCreateInfo,
                latitude: latlng.getLat(),
                longitude: latlng.getLng()
            })
            setMessage(`lat: ${latlng.getLat()}, lng: ${latlng.getLng()}`)
            displayMarker(kakaoMap, new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()))
            // 클릭한 위도, 경도 정보를 가져옵니다 
        })

        if (navigator.geolocation) {
            console.log(clickedMarker)
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                const locPosition = new kakao.maps.LatLng(lat, lng)
                bounds.extend(locPosition)
                kakaoMap.setBounds(bounds)
                setMessage(`Are you here? lat: ${lat}, lng: ${lng}`)
                // const message = <div style={{ padding: '5px' }}>Are you here?</div>
                displayMarker(kakaoMap, locPosition)
            })
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
            {/* <div id="clickLatlng"></div> */}
            <div>
                {message}
            </div>
        </>
    )
}

export default GetLocation

