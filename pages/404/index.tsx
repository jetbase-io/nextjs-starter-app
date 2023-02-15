import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Link from 'next/link';
import React from 'react'
import { HOME_ROUTE } from '../../store/constants/route-constants';

const NotFoundPage = () => {
  return (
    <Container>
      <Typography color="#ccc" fontSize="255px" margin="250px 0 0 0" variant='h1' textAlign="center" fontWeight="bold">404</Typography>
      <Typography textAlign="center"><Link href={HOME_ROUTE}>Go Home</Link></Typography>
    </Container>
  )
}
export default NotFoundPage;
