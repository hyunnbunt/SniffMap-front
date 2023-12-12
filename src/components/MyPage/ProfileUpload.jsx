import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import CropModal from './CropModal'
import { AppContext } from '../../App'

const ProfileUpload = ({myPageMode, setMyPageMode, setUserProfileImg, setDogProfileImg}) => {

    const values = useContext(AppContext)

    const user = values.user.userData
    const dog = values.getDog()

    let img = null
    if (myPageMode === 'user') {
        img = user.profileImageURL
    }
    if (myPageMode === 'dog') {
        img = dog.dogProfileImageURL
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
        const postURL = `${values.serverURL}/${requestTo}/upload-profile`
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
            values.updateUserData(res.data)
            if (myPageMode === 'user') {
                setUserProfileImg(res.data.profileImageURL)
            }
            if (myPageMode === 'dog') {
                console.log(res.data)
                setDogProfileImg(res.data.dogProfileImageURL)
            }
            setMyPageMode('myPage')
        } else {
            values.setMsg('Failed to upload the image.')
        }
    }

    const handleClickUpload = async () => {
        let requestTo = null
        if (myPageMode === 'user') {
            requestTo = `users/${user.id}`
        }
        if (myPageMode === 'dog') {
            requestTo = `dogs/${dog.id}`
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
                alt='preview'
                className='radius'
            />
            <div>
                <button onClick={openModal}>open cropper</button>
                <CropModal
                    user={values.user}
                    uploadImage={uploadImage}
                    myPageMode={myPageMode}
                    isModalOpen={isModalOpen}
                    setUploadImage={setUploadImage}
                    setFile={setFile}
                    closeModal={closeModal}
                />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleClickUpload() }}>
                <input
                    onChange={handleInputFileChange}
                    name='profileImage' type='file'
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