import { useRouter } from "next/router";
import { SIGN_IN_ROUTE } from "../../../store/constants/route-constants";
import { Box, Button } from "@mui/material";

const Placeholder = () => {
  const router = useRouter();

  const handleClick = () => {
    return router.push(SIGN_IN_ROUTE);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>You have been successfully signed up!</h1>
      <p>Please check your inbox and confirm an email address to be able to sign in.</p>
      <br />
      <Button onClick={handleClick} variant="text">
        Go to the Home page
      </Button>
    </Box>
  );
};

export default Placeholder;
