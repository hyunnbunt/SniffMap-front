import React, {useState} from 'react'
import axios from 'axios'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage"

const Update = (props) => {

    const [file, setFile] = useState(null)
    const [imgURL, setImgURL] = useState("")

    // const firebaseConfig = {
    //     apiKey: "AIzaSyAs_ZYJiY7ieqedtRkAQUcDCgnkvcLikww",
    //     authDomain: "bunt-project-404405.firebaseapp.com",
    //     projectId: "bunt-project-404405",
    //     storageBucket: "bunt-project-404405.appspot.com",
    //     messagingSenderId: "936787903562",
    //     appId: "1:936787903562:web:531ccaa0ddb7151e1b12b3"
    //   }
    //   const app = initializeApp(firebaseConfig)

    // Create a root reference
    // const storage = getStorage()
    const actionURI = `http://localhost:8080/${props.user.id}/upload-photos`

    const handleClickSubmit = async (e) => {
        e.preventDefault(e)
        // console.log(file)
        // const photoRef = ref(storage, file.name)
        // const snapshot = await uploadBytes(photoRef, file) 
        // console.log(snapshot)
        const image = new FormData()
    
        image.append("profileImage", file, file.name)
        image.append("uploadFileName", file.name)
        console.log(image)
        const config = {
            headers: { 
                "Content-Type" : "multipart/form-data"
            }   
        }
        const res = await axios.post(actionURI, image, config)
        console.log(res.data)
        setImgURL(res.data.profileImageURL)
        return res.data
    }

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }
    console.log(props.user.profileImageURL)
    return (
        <>
            <h1>Upload {props.user.dogs[props.selectedDogIndex].name}'s images!</h1>
            {/* <form action={actionURI} method="post" encType="multipart/form-data"> */}
            <form onSubmit={handleClickSubmit}>
            {/* <form action={actionURI} method="post"> */}
                <input onChange={handleInputFileChange} name="profileImage" type="file"/>
                <br></br>
                <button type="submit">upload</button>
            </form>
            <img src={imgURL}  style={{ width: '500px'}}/>
        </>
    )
}

export default Update