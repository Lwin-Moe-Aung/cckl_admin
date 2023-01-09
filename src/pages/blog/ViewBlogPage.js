import { Alert, Box, Button, Card, Chip, Container, Divider, Link, Stack, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { useLocation , Link as RouterLink, useSearchParams} from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Iconify from '../../components/iconify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { fDate } from '../../utils/formatTime';
import { StandardImageList } from '../../components/standard-image-list';

const StyledImagesBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    color: theme.palette.text.disabled,
}));

export default function ViewBlogPage() {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [post, setPost] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const slug = searchParams.get('b');
    const url = "/admin/posts"
    const from = "/dashboard/blogs";
    const editBlogUrl = `/dashboard/blogs/edit?b=${slug}`;

    const cardstyle = { width: '100%',  p: 4, backgroundColor: '#FFFFFF', fontSize: 2 };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
      
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPost = async () => {
            try {
                await delay(1000);
                const post = await axiosPrivate.get(`${url}/${slug}`,{
                    signal: controller.signal
                });
                if(isMounted) setPost(post.data);
            } catch (error) {
                if(error.response.status === 400) {
                    setErrMsg(error.response.data.message)
                }else{
                    setErrMsg("Something Wrong!");
                }
            }
        }
        getPost();
        return () => {
          isMounted = false;
          controller.abort();
        }
    },[slug])
    
    console.log("detail");
    console.log(slug);
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Post Detail
                    </Typography>
                    <Link to={from} component={RouterLink}>
                        <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                            Back
                        </Button>
                    </Link>
                </Stack>
                <Card sx={cardstyle}>
                    {   errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>   }
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h4" justify="center">
                            { post?.title }

                            <Box>
                                {post?.postCategories?.map((item, index) => (
                                    <Chip icon={<BookmarksIcon />} label={item.name} variant="outlined" key={index}/>
                                ))}
                            </Box>
                        </Typography>
                    </Stack>
                    <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' ,p:1 }}>
                        {fDate(post?.createdAt)}
                    </Typography>
                    {/* <Divider /> */}
                    
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{
                            __html:post?.description
                        }}
                    />
                    <Divider />

                    <StyledImagesBox >
                        <StandardImageList images={post?.image}/>
                    </StyledImagesBox>

                    <Box sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', }}>
                        <Link to={editBlogUrl} component={RouterLink} state={slug}>
                            <Button variant="outlined">Edit</Button>
                        </Link>
                    </Box>
                </Card>
            </Container>
        </>
    );
}

