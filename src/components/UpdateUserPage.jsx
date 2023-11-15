import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Modal from 'react-modal'

const UpdateUserPage = (props) => {

    const [file, setFile] = useState(null)
    const [image, setImage] = useState(props.user.profileImageURL)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cropResult, setCropResult] = useState(null)
    const [isImageCropped, setIsImageCropped] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    const updateFileToCroppedImage = async (url) => {
            const response = await fetch(url)
            console.log(response)
            const data = await response.blob()
            const ext = url.split(";")[0].split("/").pop() 
            const name = `_user_${props.user.id}_cropped.${ext}` 
            console.log(ext)
            console.log(name)
            const metadata = { type: `image/${ext}` }
            return new File([data], name, metadata)
    }

    console.log(file)
    
    const uploadImageToServer = async (uploadImageFile) => {
        const actionURI = `http://localhost:8080/owners/${props.user.id}/upload-profile`
        const imageData = new FormData()
        imageData.append("imageFile", uploadImageFile, uploadImageFile.name)
        imageData.append("uploadFileName", uploadImageFile.name)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const res = await axios.post(actionURI, imageData, config)
        console.log(res)
        if (res.status === 200) {
            await props.updateUser()
            props.setCurrentMode("MyPage")
        }
    }


    const handleClickSubmit = async (e) => {
        e.preventDefault(e)
        if (isImageCropped) {
            const croppedFile = await updateFileToCroppedImage(cropResult)
            setFile(croppedFile)
            await uploadImageToServer(croppedFile)
        }
    }


    useEffect(() => {
        if (file !== null) {
            URL.revokeObjectURL(image)
            const objectUrl = URL.createObjectURL(file)
            setImage(objectUrl)
        }
    }, [file])

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const cropper = useRef()
    
    const handleCrop = () => {
        const cropperData = cropper?.current.cropper
        const croppedCanvas = cropperData.getCroppedCanvas()
        setCropResult(croppedCanvas.toDataURL())
    }

    const ModalChildren =
        <>
            <>Crop your image</>
            <form onSubmit={(e) => {
                e.preventDefault()
                setImage(cropResult)
                // console.log(cropResult)
                setIsImageCropped(true)
                setIsModalOpen(false)
            }}>
                <Cropper
                    src={image}
                    viewMode={1}
                    initialAspectRatio={16 / 9}
                    style={{ width: '200px' }}
                    ref={cropper}
                    crop={handleCrop}
                />
                <button>Crop!</button>
            </form>
        </>

    return (
        <>
            <h1>Upload your new profile photo here.</h1>
            {/*업로드한 이미지 미리보기*/}
            <img src={image} style={{ width: '120px' }} alt="preview" />
            <button onClick={openModal}>Open Modal</button>
            <Modal children={ModalChildren} isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false} style={customStyles} contentLabel="Test" />
            {/* <Cropper src={previewSrc} style={{width: '200px'}}/> */}
            {/* <form action={actionURI} method="post" encType="multipart/form-data"> */}
            <form onSubmit={handleClickSubmit}>
                {/* <form action={actionURI} method="post"> */}
                <input onChange={handleInputFileChange} name="profileImage" type="file" />
                <br></br>
                <button type="submit">upload</button>
            </form>
        </>
    )
}

export default UpdateUserPage