import './style.scss';
import _ from 'lodash';
import React, { useState } from 'react';
import { Box, Container, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
// import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from '../../api/axios';

export const MultipleDropzone = ({uploadUrl, id, label,photo, imageURL }) => {
    const [uploadedImgs, setUplodedImgs] = useState([]);

     // upload images
    const uploadImage = async e => {
        const { files } = e.target;
        const formData = new FormData();
        formData.append('image', files[0]);
        try{
            const { data } = await axios.post(uploadUrl, formData);
            imageURL(data.imagePath);
            setUplodedImgs([...uploadedImgs, data.imagePath])
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
            <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
            <Box className="d-flex dropzone-container">
                <Container justifyContent="center" alignItems="center" className="dropzone-uploader-mask">
                    <CloudUploadIcon/>
                </Container>
                <input className="dropzone-input" type="file" id={id} onChange={uploadImage} />
            </Box>
            {
                uploadedImgs ? (
                    uploadedImgs.map((uploadImage,index) => (
                        <ImageListItem sx={{ width:200 }} key={index}>
                            <img
                                src={`${uploadImage}?w=100&fit=crop&auto=format`}
                                srcSet={`${uploadImage}?w=100&fit=crop&auto=format&dpr=2 2x`}
                                alt={uploadImage}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                position='top'
                                actionIcon={
                                    <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    >
                                        <ClearIcon onClick={clear}/>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))
                ): null
            }
        </div>
    )
}
