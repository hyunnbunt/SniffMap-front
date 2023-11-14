import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Modal from 'react-modal'

const UpdateUserPage = (props) => {

    const [file, setFile] = useState(null)
    const [image, setImage] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cropResult, setCropResult] = useState(null)

    const onCrop = () => {
        const imageElement = cropperRef?.current
        const cropper = imageElement?.cropper
        const croppedDataURL = cropper.getCroppedCanvas().toDataURL()
        const blob = dataURItoBlob(croppedDataURL)
        setFile(blob)
    }

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


    const handleClickSubmit = async (e) => {
        e.preventDefault(e)
        const actionURI = `http://localhost:8080/owners/${props.user.id}/upload-profile`
        const imageData = new FormData()
        imageData.append("imageFile", file, file.name)
        imageData.append("uploadFileName", file.name)
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

    useEffect(() => {
        if (file === null) {
            setImage("")
        } else {
            if (image !== "") {
                URL.revokeObjectURL(image)
            }
            const objectUrl = URL.createObjectURL(file)
            setImage(objectUrl)
        }
    }, [file])

    const handleInputFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleCrop = (e) => {
        console.log("cropped")
    }

    const getCroppedImg = async (e) => {
        e.preventDefault()
        try {
            const canvas = <canvas></canvas>
            const scaleX = image.naturalWidth / image.width
            const scaleY = image.naturalHeight / image.height
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            )
            const base64Image = canvas.toDataURL("image/jpeg", 1)
            setImage(base64Image)
        } catch (error) {
            console.log(error)
            console.log("crop the image")
        }

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                this.setState({ blobFile: blob }) // Set blob image inside the state here 
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    // const handleCropSubmit = async (e) => {
    //     await getCroppedImg(e)
    //     setPreviewSrc(result)
    // }

    const ModalChildren =
        <>
            <>Crop your image</>
            <form onSubmit={getCroppedImg}>
                <Cropper viewMode={1} src={image} style={{ width: '200px' }} />
                <button>Crop!</button>
            </form>
        </>

    console.log(props.user.profileImageURL)
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