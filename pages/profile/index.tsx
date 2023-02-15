import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { UpdateUserAvatarPage } from "../../components/modals/update-user-avatar";
import { parseJwt } from "../../helpers/user";
import { SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { Dispatch, RootState } from "../../store/store";

interface IProfilePageProp {
  isAuthenticated: boolean;
  updateUsername: (username: string) => void;
  getUser: (id: string) => void;
  user: any;
  userToken: any;
}

const ProfilePage: NextPage<IProfilePageProp> = ({
  updateUsername,
  isAuthenticated,
  getUser,
  user,
  userToken
}) => {
  const [userNameModal, setUserNameModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push(SIGN_IN_ROUTE);
    else if (!user?.id && userToken?.id) getUser(userToken?.id);
  }, [isAuthenticated]);

  const handleModal = () => {
    setUserNameModal(!userNameModal);
  }

  return (
    <Container sx={{ paddingTop: "40px" }}>
      <Typography variant="h3">ProfilePage</Typography>
      <Box sx={{ textAlign: 'center', marginTop: '50px'}}>
        <div>
          <Typography variant="h3">{user?.username || "User"}</Typography>
          <Typography>{user?.email || "user@mail.com"}</Typography>
        </div>
        <Button variant="contained" sx={{ margin: "20px 20px 0 0" }} onClick={handleModal}>
          Change Username
        </Button>
        <Button variant="contained" sx={{ margin: "20px 20px 0 0" }}>
          Change Avatar
        </Button>
      </Box>
      <UpdateUserAvatarPage data={user?.username} open={userNameModal} handleClose={handleModal} onSubmit={updateUsername} />
    </Container>
  );
}

const mapState = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
  userToken: parseJwt(state.user.accessToken)
});

const mapDispatch = (dispatch: Dispatch) => ({
  getUser: dispatch.user.getUser,
  updateUsername: dispatch.user.updateUsername,
});

export default connect(mapState, mapDispatch)(ProfilePage);
