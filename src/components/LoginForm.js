// src/components/LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { login as loginService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import OAuthLogin from './OAuthLogin'; // Import the OAuthLogin component

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const LoginFormStyled = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginService(credentials);
            console.log('Response from loginService:', response); // Debugging line
            const { accessToken: token, user } = response;
            if (token) {
                login(token, user);
                console.log('Logged in successfully, JWT token:', token); // Log the token here
                navigate('/home_profile');
            } else {
                console.error('No token received');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <FormContainer component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <LoginFormStyled onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </LoginFormStyled>
          <h3>Or login with</h3>
          <OAuthLogin /> {/* Include OAuth login buttons */}
          <p>Not registered yet? <Button onClick={() => navigate('/sign-up')}>Sign Up</Button></p>
        </FormContainer>
    );
};

export default LoginForm;
