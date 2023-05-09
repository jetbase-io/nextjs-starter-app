import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "../../store/constants/route-constants";
import { NextPage } from "next";
import { UserSlice, UserSliceProps } from "../../store/slice/user";
import Placeholder from "../../components/layouts/placeholder";

const ConfirmationPage: NextPage<UserSliceProps> = (props) => {
  const { isAuthenticated, isConfirmed, confirm } = props;
  const router = useRouter();

  const token = router.query.confirmation_token;
  useEffect(() => {
    if (!token || typeof token !== "string") return;
    confirm({ token });
  }, [token]);

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
        {isConfirmed ? (
          <Placeholder
            title={"Confirmation successful!"}
            message={"Thank you for confirmation your email address. Now you can sing in."}
            btnTitle={"Go to the Sing in page"}
            onClick={handleClick}
          />
        ) : (
          <Placeholder
            title={"Invalid token"}
            message={"Unable to proceed"}
            btnTitle={"Go to the Home page"}
            onClick={handleClick}
          />
        )}
      </Box>
    </div>
  );
};

export default connect(UserSlice.mapState, UserSlice.mapDispatch)(ConfirmationPage);
