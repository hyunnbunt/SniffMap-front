import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CropModal from './CropModal'

const ProfileUpload = (props) => {

    const userData = props.user.userData
    const dogData = props.user.selectedDog

    let img = null
    if (props.myPageMode === 'user') {
        img = userData.profileImageURL
    }
    if (props.myPageMode === 'dog') {
        img = dogData.dogProfileImageURL
    }

    const [file, setFile] = useState(null)
    const [uploadImage, setUploadImage] = useState(img)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        /* When the file is updated and it's not empty : 
        set the uploadImage object as the selected image. */
        if (file !== null) {
            /* Not saving previous selected file. */
            URL.revokeObjectURL(uploadImage)
            setUploadImage(URL.createObjectURL(file))
        }
    }, [file])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const uploadFileToServer = async (imgFile, requestTo) => {
        const postURL = `${props.serverURL}/${requestTo}/upload-profile`
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
            if (props.myPageMode === 'user') {
                props.updateUserData(props.user.loginInfo)
            }
            if (props.myPageMode === 'dog') {
                props.updateSelectedDogData()
            }
            // props.setCurrentMode('MyPage')
            props.setMyPageMode('myPage')
        } else {
            props.setMsg('Failed to upload the image.')
        }
    }

    const handleClickUpload = async () => {
        let requestTo = null
        if (props.myPageMode === 'user') {
            requestTo = `users/${userData.id}`
        }
        if (props.myPageMode === 'dog') {
            requestTo = `dogs/${dogData.id}`
        }
        if (requestTo === null) {
            return
        }
        if (file !== null) {
            await uploadFileToServer(file, requestTo)
            return
        }
        setMsg('Select file.')
    }

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <img
                src={uploadImage}
                style={{ width: '120px' }}
                alt="preview"
            />
            <div>
                <button onClick={openModal}>open cropper</button>
                <CropModal
                    user={props.user}
                    uploadImage={uploadImage}
                    myPageMode={props.myPageMode}
                    isModalOpen={isModalOpen}
                    setUploadImage={setUploadImage}
                    setFile={setFile}
                    closeModal={closeModal}
                />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleClickUpload() }}>
                <input
                    onChange={handleInputFileChange}
                    name="profileImage" type="file"
                /><br />
                <button type="submit">upload</button>
            </form>
            <div>
                {msg}
            </div>

        </>
    )

}

export default ProfileUpload