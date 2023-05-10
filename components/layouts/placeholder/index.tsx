import { FC } from "react";
import { Box, Button } from "@mui/material";

interface IProps {
  title: string;
  message: string;
  btnTitle: string;
  onClick: () => void;
}

const Placeholder: FC<IProps> = ({ title, message, btnTitle, onClick }) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <br />
      <Button onClick={onClick} variant="text">
        {btnTitle}
      </Button>
    </Box>
  );
};

export default Placeholder;
