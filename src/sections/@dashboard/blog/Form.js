import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    Grid,
    Card,
    Alert,
    Input,
    Box
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { MultipleDropzone } from '../../../components/Uploader/MultipleUploaders';
import { SingleDropzone } from '../../../components/Uploader/SingleUploaders';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
import { CheckboxesTags } from '../../../components/checkboxes-tags';
import { IOSSwitch } from '../../../components/ios-switch';
import { TextEditor } from '../../../components/text-editor';
/* eslint-disable camelcase */

export default function Form({url, initValues}){
    const [published, setPublished] = useState(initValues.published);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [editorErrMsg, setEditorErrMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [extraImages, setExtraImages ] = useState(initValues.image);

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/blogs";
    const uploadUrl = "/admin/uploads/post-image";

    //* console
    // console.log(`published Form: ${published}`)

    useEffect(() => {
        setValue('user_id', auth?.user?.id)
    },[]);
   
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    
    const onSubmit = async (data) => {
        if(data.description.value.length < 50){
            setEditorErrMsg('Required, Add description Minimum length 50 characters');
            return;
        }
        try{
            await axiosPrivate.post(url,
                JSON.stringify({...data, description: data.description.value, image:extraImages}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            navigate(backUrl, { replace: true });
        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('User Create Failed');
            }
        }
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
                        {/* <SingleDropzone
                            uploadUrl={uploadUrl}
                            label="Dropzone"
                            id="dropzone-uploader"
                            extraImages={extraImages}
                            setExtraImages={(data) => {
                                setExtraImages([...extraImages, data])
                                }}
                            removeImage={
                                async (i) => {
                                    await extraImages.splice(i,1)
                                    await setExtraImages([...extraImages])
                                }}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CheckboxesTags 
                            label="Categories"
                            setSelectedCategory ={ 
                                (newValue) => {
                                    setSelectedCategory(newValue);
                                    setValue('category_id', newValue)
                                }}
                            selectedCategory = {selectedCategory}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextEditor
                            setValue={(val) => setValue('description', val)}
                        />    
                        {editorErrMsg && <Alert severity="error" sx={{ mb: 2 }}>{editorErrMsg}</Alert>}

                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <IOSSwitch
                            published= {published}
                            onChange= {async () => {
                                await setPublished(!published)
                                await setValue("published", !published)
                            }}
                            label = "Publish"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <MultipleDropzone
                            uploadUrl={uploadUrl}
                            label="Dropzone"
                            id="dropzone-uploader"
                            extraImages={extraImages}
                            setExtraImages={(data) => {
                                setExtraImages([...extraImages, data])
                                }}
                            removeImage={
                                async (i) => {
                                    await extraImages.splice(i,1)
                                    await setExtraImages([...extraImages])
                                }}
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

