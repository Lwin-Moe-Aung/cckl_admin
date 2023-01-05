import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    IconButton, 
    InputAdornment,
    Grid,
    Card,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Alert,
    FormHelperText,
    TextareaAutosize
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { MultipleDropzone } from '../../../components/Uploader/MultipleUploaders';
import Iconify from '../../../components/iconify';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
import { CheckboxesTags } from '../../../components/checkboxes-tags';
import { IOSSwitch } from '../../../components/ios-switch';
import axios from '../../../api/axios';
/* eslint-disable camelcase */


export default function Form({url, initValues}){
    const [published, setPublished] = useState(initValues.published);

    const editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/users";
    const uploadUrl = "/admin/uploads/post-image";

    const uploadImageCallBack = (files) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', files);
            axios.post(uploadUrl, formData)
                .then((data) =>  {
                    resolve({data:{link: data.data.imagePath}})
                })
                .catch((error) => {
                    reject(error);
                }) 
        });
    }
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const imageURL = (data) => {
        setValue("photo", data);
    }
     
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    const onSubmit = async (data) => {
        // e.preventDefault();
        try{
            await axiosPrivate.post(url,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            // error throwing
            navigate(backUrl, { replace: true });
        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('User Create Failed');
            }
        }
    }
    
    const handleChange = async () => {
        await setPublished(!published);
        await setValue("published", published);
    }
    return (
        <Card sx={cardstyle}>
            {
            errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="title" 
                            label="Post Title" 
                            color="secondary"
                            {...register("title", { required: "User Name is required." })}
                            error={Boolean(errors.title)}
                            helperText={errors.title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth
                            name="slug" 
                            label="Slug" 
                            {...register("slug", { required: "Slug is required." })}
                            error={Boolean(errors.slug)}
                            helperText={errors.slug?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CheckboxesTags label="Categories"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Editor
                            editorState={description}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: {
                                    uploadEnabled: true,
                                    uploadCallback: uploadImageCallBack,
                                    previewImage: true,
                                    alt: { present: false, mandatory: false },
                                    defaultSize: {
                                        height: 'auto',
                                        width: 'auto',
                                   },
                                },
                            }}
                        />
                        <TextareaAutosize 
                            style={{display:'none'}} 
                            disabled 
                            ref={(val) => {initValues.description = val}} 
                            value={draftToHtml(convertToRaw(description.getCurrentContent())) } 
                        />
                    </Grid>
                    
                    
                    <Grid item xs={12} sm={12} md={12}>
                        <IOSSwitch
                            published= {published}
                            onChange= {handleChange}
                            label = "Publish"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MultipleDropzone
                            uploadUrl={uploadUrl}
                            label="Dropzone"
                            id="dropzone-uploader"
                            photo={initValues.photo}
                            imageURL={imageURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} 
                        container
                        justifyContent="right"
                    >
                        <Grid  sx={{ mr: 2 }}>
                            <Cancel backUrl={backUrl} />
                        </Grid>
                        <Grid >
                            <SaveButton/>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

