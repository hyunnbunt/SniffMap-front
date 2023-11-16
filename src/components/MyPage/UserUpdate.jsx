import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CropModal from './CropModal'

const UpdateUserPage = (props) => {

    const [file, setFile] = useState(null)
    const [uploadImage, setUploadImage] = useState(props.user.userData.profileImageURL)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [msg, setMsg] = useState('')
    
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }
    
    useEffect(() => {
        /* When the file is updated and it's not empty : 
        set the uploadImage object as the selected image. */
        if (file !== null) {
            /* Not saving previous selected file. */
            URL.revokeObjectURL(uploadImage)
            setUploadImage(URL.createObjectURL(file))
        }
    }, [file])

    const croppedImageToFile = async (cropImageURL) => {
        const img = await fetch(cropImageURL)
        const imgData = await img.blob()
        const ext = cropImageURL.split(";")[0].split("/").pop()
        const name = `_user_${props.user.id}_cropped.${ext}`
        const metadata = { type: `image/${ext}` }
        return new File([imgData], name, metadata)
    }

    const uploadFileToServer = async (imgFile) => {
        const postURL = `${props.serverURL}/users/${props.user.userData.id}/upload-profile`
        const imgFormData = new FormData()
        imgFormData.append('imageFile', imgFile, imgFile.name)
        imgFormData.append('uploadFileName', imgFile.name)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.post(postURL, imgFormData, config)
        console.log(res)
        if (res.status === 200) {
            await props.updateUser()
            props.setCurrentMode('MyPage')
        } else {
            props.setMsg('Failed to upload user profile.')
        }
    }

    const handleClickUpload = async (e) => {
        e.preventDefault(e)
        if (file !== null) {
            await uploadFileToServer(file)
            return
        }
        setMsg('Select file.')
    }

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <h1>Upload your new profile photo here.</h1>
            <img src={uploadImage} style={{ width: '120px' }} alt="preview" />
            <div>
                <button onClick={openModal}>open cropper</button>
                <CropModal
                    uploadImage={uploadImage}
                    isModalOpen={isModalOpen}
                    setUploadImage={setUploadImage}
                    setFile={setFile}
                    closeModal={closeModal}
                />
            </div>
            <form onSubmit={handleClickUpload}>
                {/* <form action={actionURI} method="post"> */}
                <input onChange={handleInputFileChange} name="profileImage" type="file" /><br />
                <button type="submit">upload</button>
            </form>
        </>
    )
}

export default UpdateUserPage