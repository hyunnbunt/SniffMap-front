import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage"

const UpdateDogPage = (props) => {
    const dog = props.user.dogs[props.selectedDogIndex]

    const [file, setFile] = useState(null)
    const actionURI = `http://localhost:8080/dogs/${dog.id}/upload-profile`
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

    console.log(props.dog)
    return (
        <>
            <h1>Upload your dog's new profile photo here.</h1>
            <img src={previewSrc} style={{ width: '120px' }} alt="preview" />
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

export default UpdateDogPage