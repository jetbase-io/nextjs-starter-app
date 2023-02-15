import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import { SIGN_IN_ROUTE } from '../../store/constants/route-constants';
import { RootState } from '../../store/store';

const AboutUsPage: FC<any> = () => {

  return (
    <Container sx={{ paddingTop: "50px"}}>
      <Typography variant='h3'>About Us</Typography>
      <Box justifyContent="center">
        <Typography variant='h5'>We are the best team</Typography>
      </Box>
    </Container>
  );
}

export default AboutUsPage;
