import { Alert, Button, Card, Container, Link, Stack, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { useLocation , Link as RouterLink} from "react-router-dom";
import Iconify from '../../components/iconify';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



export default function ViewBlogPage() {
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [post, setPost] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const slug = location.pathname.split("/")[3];
    const url = "/admin/posts"
    const from = "/dashboard/blogs";

    const cardstyle = { width: '100%',  p: 4, m:1, backgroundColor: '#FFFFFF', fontSize: 2 };

    console.log(slug);
 
    useEffect(() => {
        const getPost = async () => {
            const post = await axiosPrivate.get(`${url}/${slug}`);

        }
        getPost();
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPost = async () => {
            try {
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
      },[])
    
    
    console.log(post);
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
                        <Typography variant="h4" justify="center">
                                { post?.title }
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{
                                __html:post?.description
                            }}
                        />
                    </Card>
                </Container>
        </>
    );
}

