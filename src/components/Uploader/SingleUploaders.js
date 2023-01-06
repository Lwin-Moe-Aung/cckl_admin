import './style.scss';
import React, { useState } from 'react';
import { Box, Container, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';
import axios from '../../api/axios';

export const SingleDropzone = ({uploadUrl, id, label,photo, imageURL }) => {
    const [uploadedImgs, setUplodedImgs] = useState(photo);
     // upload images
    const uploadImage = async e => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append('photo', files[0]);
        try{
            const { data } = await axios.post(uploadUrl, formData);
            imageURL(data.imagePath);
            setUplodedImgs(data.imagePath)
        } catch(err) {
            console.log(err)
        }
    }

    const clear = async () => {
        await imageURL('');
        await setUplodedImgs('');
    }

    return (
        <div className="form-group">
            <div className="d-flex">
                <Box className="d-flex" label="sadfasdfasd">
                    <Container justify="center"  className="file-uploader-mask d-flex justify-content-center align-items-center">
                        <CollectionsSharpIcon/>
                    </Container>
                    <input className="file-input" type="file" id={id} onChange={uploadImage} />
                </Box>
                {
                    uploadedImgs && (
                        <img
                            src={uploadedImgs}
                            alt="UploadedImage"
                            className="img-thumbnail img-fluid uploaded-img ml-3"
                        />
                    )
                }
            </div>
        </div>
    )
}
