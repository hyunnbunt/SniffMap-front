import React from 'react'

const Index = () => {
    return (
        <form>
            ID : <input id='userId' type='text'></input>
            Password : <input id='pw' type='password'></input>
            <input type='submit' value='LogIn'></input>
        </form>
    )
}

export default Index