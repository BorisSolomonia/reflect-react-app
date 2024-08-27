import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

const SuccessContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function Success() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home_profile');
  };

  return (
    <SuccessContainer>
      <Typography component="h1" variant="h5">
        Registration Successful!
      </Typography>
      <Typography variant="body1">
        Your user ID is: {id}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleHomeClick} style={{ marginTop: '20px' }}>
        Home
      </Button>
    </SuccessContainer>
  );
}

export default Success;
