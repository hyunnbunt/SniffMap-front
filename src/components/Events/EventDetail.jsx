import React from 'react'

const EventDetail = ({ evnt }) => {
    /* When updates the data, better get data from server everytime, 
    or modify on frontend with the server response..? */
    return (
        <h2>{`${evnt.time} in ${evnt.latitude} + ${evnt.longitude}`}</h2>
    )
}

export default EventDetail