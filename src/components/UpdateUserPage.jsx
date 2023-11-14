import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const UpdateUserPage = (props) => {

    const [file, setFile] = useState(null)

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
    const actionURI = `http://localhost:8080/owners/${props.user.id}/upload-profile`
    const [previewSrc, setPreviewSrc] = useState("")

    const handleClickSubmit = async (e) => {
        e.preventDefault(e)
        // console.log(file)
        // const photoRef = ref(storage, file.name)
        // const snapshot = await uploadBytes(photoRef, file) 
        // console.log(snapshot)
        const image = new FormData()
    
        image.append("imageFile", file, file.name)
        image.append("uploadFileName", file.name)
        console.log(image)
        const config = {
            headers: { 
                "Content-Type" : "multipart/form-data"
            }   
        }
        const res = await axios.post(actionURI, image, config)
        console.log(res)
        if (res.status === 200) {
            console.log(res.data)
            await props.updateUser()
            props.setCurrentMode("MyPage")
        }
    }

    useEffect(() => {
        previewFile()
    }, [file])

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const previewFile = () => {
        if (file !== null) {
            if (previewSrc !== "") {
                URL.revokeObjectURL(previewSrc)
            }
            const objectUrl = URL.createObjectURL(file)
            setPreviewSrc(objectUrl)
        }
    }
    console.log(props.user.profileImageURL)
    return (
        <>
            <h1>Upload your new profile photo here.</h1>
            {/*업로드한 이미지 미리보기*/}
            <img src={previewSrc} style={{ width: '120px' }} alt="preview" />
            <Cropper />
            {/* <form action={actionURI} method="post" encType="multipart/form-data"> */}
            <form onSubmit={handleClickSubmit}>
            {/* <form action={actionURI} method="post"> */}
                <input onChange={handleInputFileChange} name="profileImage" type="file"/>
                <br></br>
                <button type="submit">upload</button>
            </form>

        </>
    )
}

export default UpdateUserPage