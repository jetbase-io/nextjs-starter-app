import { GetServerSideProps, NextPage } from "next";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { UserSlice, UserSliceProps } from "../../store/slice/user";
import Placeholder from "../../components/layouts/placeholder";
import SignUpForm from "../../components/layouts/sign-up-form";

const SignUpPage: NextPage<UserSliceProps> = (props) => {
  const router = useRouter();

  const { signUp, isAuthenticated, isSignedUp } = props;

  useEffect(() => {
    if (isAuthenticated) {
      router.push(HOME_ROUTE);
    }
  }, [isAuthenticated]);

  const handleClick = () => {
    return router.push(SIGN_IN_ROUTE);
  };

  return (
    <div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {isSignedUp ? (
          <Placeholder
            title={"You have been successfully signed up!"}
            message={"Please check your inbox and confirm an email address to be able to sign in."}
            btnTitle={"Go to the Home page"}
            onClick={handleClick}
          />
        ) : (
          <SignUpForm signUp={signUp} />
        )}
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = "" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default connect(UserSlice.mapState, UserSlice.mapDispatch)(SignUpPage);
