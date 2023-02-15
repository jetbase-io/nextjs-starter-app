import { Box, Button, ButtonGroup, Modal, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

export const UpdateUserAvatarPage: FC<any> = ({ open, handleClose, onSubmit, data }) => {
  const [username, setUsername] = useState(data || "");

  useEffect(() => {
    if (data && !username) setUsername(data);
  }, [data])

  const clickHandler = () => {
    if (username !== data) onSubmit(username);
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        width: "400px",
        margin: "0 auto",
        marginTop: "250px",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change User Name
        </Typography>
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          value={username}
          sx={{ marginTop: "20px", width: "100%" }}
          onChange={(event) => setUsername(event.target.value)}
        />
        <ButtonGroup sx={{ margin: "30px auto 0 auto", justifyContent: "space-between", width: "100%" }}>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button onClick={clickHandler} variant="contained">
            Change
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
}
