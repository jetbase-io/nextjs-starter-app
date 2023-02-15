import { Container, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { SIGN_IN_ROUTE } from "../store/constants/route-constants";
import { UserSlice, UserSliceProps } from "../store/slice/user";

import styles from "../styles/Home.module.css";

const HomePage: NextPage<UserSliceProps> = (props) => {
  const { isAuthenticated, checkSubscription } = props;
  const { locale, locales, push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      checkSubscription();
    } else {
      push(SIGN_IN_ROUTE)
    }
  }, [isAuthenticated]);

  if (isAuthenticated) return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Typography variant="h3" component="h2" textAlign={"center"}>
          Welcome To Starter App
        </Typography>
      </Container>
    </div>
  );
  return null;
};

export default connect(UserSlice.mapState, UserSlice.mapDispatch)(HomePage);
