import { React, useState} from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Link, 
  Button, 
  Stack, 
  Typography, 
  Container, 
  TextField, 
  IconButton, 
  InputAdornment,
  Grid,
  Card
} from '@mui/material';

import Iconify from '../components/iconify';


export const AddNewUserPage = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const {username, setUserName} = useState();
  const {email, setEmail} = useState();
  const {password, setPassword} = useState();
  const {confirmPassword, setConfirmPassword} = useState();
  const {isadmin, setIsAdmin} = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    console.log("form submit");
  }
  const cardstyle = { width: '100%',  p: 2, backgroundColor: '#EDEFF1', fontSize: 2 };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add New Users
          </Typography>
          <Link to={from} component={RouterLink}>
            <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
              Back
            </Button>
          </Link>
        </Stack>
        <Card sx={cardstyle}>
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                  <TextField 
                    fullWidth 
                    name="username" 
                    label="User Name" 
                    onChange={(e) => setUserName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField 
                  fullWidth 
                  name="email" 
                  label="Email address" 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                  <TextField 
                    fullWidth 
                    name="username" 
                    label="User Name" 
                    onChange={(e) => setUserName(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField 
                  fullWidth 
                  name="email" 
                  label="Email address" 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <></>
              </Grid>
              <Grid item xs={12} sm={6} md={6} 
                container
                justifyContent="right"
              >
                <Grid  sx={{ mr: 2 }}>
                  <Button variant="outlined">Cancle</Button>
                </Grid>
                <Grid >
                  <Button type="submit" variant="contained">Save</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
    
  )
}
