import React from 'react'

const ProfileUpload = () => {

    const userData = props.user.userData
    const dogData = props.user.selectedDog

    const [file, setFile] = useState(null)
    const [uploadImage, setUploadImage] = useState(userData.profileImageURL)
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

    const uploadFileToServer = async (imgFile, requestTo) => {
        if (requestTo === null) {
            return
        }
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
            await props.updateUser(props.user.loginInfo)
            props.setMyPageMode('myPage')
        } else {
            props.setMsg('Failed to upload the image.')
        }
    }

    const handleClickUpload = async (e, updateObject) => {
        e.preventDefault()
        let requestTo = null
        if (updateObject === 'user') {
            requestTo = `users/${userData.id}`
        }
        if (updateObject === 'dog') {
            requestTo = `dogs/${dogData.id}`
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
                    userData={userData}
                    uploadImage={uploadImage}
                    isModalOpen={isModalOpen}
                    setUploadImage={setUploadImage}
                    setFile={setFile}
                    closeModal={closeModal}
                />
            </div>
            <form onSubmit={handleClickUpload}>
                {/* <form action={actionURI} method="post"> */}
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