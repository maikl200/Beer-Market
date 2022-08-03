import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ActiveLink from "../ActiveLink/ActiveLink";

const ResponsiveAppBar = () => {

  return (
    <AppBar
      sx={{background: 'black'}}
      position="static"
    >
      <Container>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
                justifyContent: 'center'
              }
            }}
          >
            <ActiveLink href='/'>
              <Button
                sx={{my: 2, color: 'white'}}
              >
                Market
              </Button>
            </ActiveLink>
            <ActiveLink href='/itemsSold'>
              <Button
                sx={{my: 2, color: 'white'}}
              >
                Sell history
              </Button>
            </ActiveLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;