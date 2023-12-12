import React, { useState, useRef } from 'react'
import Modal from 'react-modal'
import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './cropper-box.css'


const CropModal = (props) => {

    const [cropperData, setCropperData] = useState(null)
    
    
    const croppedImageToFile = async (cropImageURL) => {
        const img = await fetch(cropImageURL)
        const imgData = await img.blob()
        const ext = cropImageURL.split(";")[0].split("/").pop()
        const name = `${props.myPageMode}_profile_cropped.${ext}`
        const metadata = { type: `image/${ext}` }
        return new File([imgData], name, metadata)
    }

    const handleClickCrop = async (e) => {
        e.preventDefault()
        const croppedCanvas = cropperData.getCroppedCanvas()
        const cropImage = croppedCanvas.toDataURL()
        props.setUploadImage(cropImage)
        const croppedFile = await croppedImageToFile(cropImage)
        props.setFile(croppedFile)
        props.closeModal()
    }

    const handleCropChange = () => {
        setCropperData(cropper?.current.cropper)
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
    
    const cropper = useRef()
    const modalChildren =
        <>
            <>Crop your image</>
            <form onSubmit={handleClickCrop}>
                <Cropper
                    src={props.uploadImage}
                    viewMode={1}
                    initialAspectRatio={16 / 9}
                    style={{ width: '200px'}}
                    ref={cropper}
                    crop={handleCropChange}
                    aspectRatio={1}
                />
                <button>Crop!</button>
            </form>
        </>

    return (
        <Modal
            children={modalChildren}
            isOpen={props.isModalOpen}
            onRequestClose={props.closeModal}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="test"
        />

    )
}

export default CropModal