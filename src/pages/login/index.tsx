import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import { getToken } from '../../integrations/authApi';
import PageLoading from '../components/PageLoading';


const theme = createTheme();

type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'block';


export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('')
  const [textAlert, setTextAlert] = useState<string>('')
  const [alertType, setAlertType] = useState<AlertType>('error')
  const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('access_token'))
  const [isloading, setIsLoading] = useState(false)

  const renderAlert = (type: AlertType, text: string) => {
    setTextAlert(text);
    setAlertType(type);
    setDisplayAlert('block');
  }

  const send = async ()=>{
    setIsLoading(true);
    try{
      const response = await getToken(
        {
          email: email,
          password: password
        }
      )
      if(response.status === 200){
        localStorage.setItem('access_token', response.data.access_token)
        setIsAuth(true);
        document.location.pathname = '/users';
      }
    }
    catch (error: unknown){
      if(axios.isAxiosError(error)){
        if( error.response && error.response.status >= 400 && error.response.status < 500 ){
          renderAlert('error', 'verfique suas credenciais');
        }
      }
    }
    setIsLoading(false)
  }

  return  isAuth ? < Navigate to="/users"/> : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box display={displayAlert}>
            <Alert severity={alertType}>{textAlert}</Alert>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event)=>setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="lembrar-me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>send()}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}