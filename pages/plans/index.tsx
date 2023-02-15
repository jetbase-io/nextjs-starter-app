import { Container, Typography } from '@mui/material'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Plans from "../../components/layouts/plans";
import { SIGN_IN_ROUTE } from '../../store/constants/route-constants';
import { UserSlice, UserSliceProps } from '../../store/slice/user';

const PlansPage: NextPage<UserSliceProps> = ({ isAuthenticated }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push(SIGN_IN_ROUTE)
  }, [isAuthenticated]);

  return (
    <Container sx={{ paddingTop: '40px' }}>
      <Typography variant="h3">Plans</Typography>
      <Plans />
    </Container>
  )
}

export default connect(UserSlice.mapState, UserSlice.mapDispatch)(PlansPage);
