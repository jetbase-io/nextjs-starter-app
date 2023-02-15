import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { FC } from 'react'

const ContactUsPage: FC<any> = ({ isAuthenticated }) => {
  
  return (
    <Container sx={{ marginTop: "50px"}}>
      <Typography variant="h3" component="h1" gutterBottom>
        {'Contact Us'}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <form
            id="contact-form"
          >
            <Grid item>
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                name="userName"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                name="email"
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                id="message"
                label="Message"
                name="message"
                margin="normal"
                multiline
              />
            </Grid>
            <Grid container direction="row" spacing={2} style={{ marginTop: 20 }}>
              <Grid item >
                <Button
                  type="reset"
                  variant="contained"
                >
                  RESET
                </Button>
              </Grid>
              <Grid item >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ContactUsPage;
