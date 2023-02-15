import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ABOUT_US_ROUTE, CONTACT_US_ROUTE, PLANS_ROUTE, PROFILE_ROUTE } from '../../../store/constants/route-constants';
import { FULL_SIGN_OUT_URL, SIGN_OUT_URL } from '../../../store/constants/api-contstants';
import { useRouter } from 'next/router';
import { Dispatch, RootState } from '../../../store/store';
import { connect } from 'react-redux';

const pages = [
  { title: "Profile", route: PROFILE_ROUTE, isAuth: true, },
  { title: "Plans", route: PLANS_ROUTE, isAuth: true, },
  { title: "About Us", route: ABOUT_US_ROUTE, isAuth: false, },
  { title: "Contact Us", route: CONTACT_US_ROUTE, isAuth: false, },
];
const settings = [
  { title: "Sign Out", route: "sign-out", isAuth: true, },
  { title: "Full Sign Out", route: "full-sign-out", isAuth: true, },
];

const ResponsiveAppBar: React.FC<any> = ({ isAuthenticated, signOut, fullSignOut }) => {
  const [auth, setAuth] = React.useState(false);
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route: string) => {
    setAnchorElNav(null);
    if (router) router.push(route);
  };

  const handleCloseUserMenu = (route: string) => {
    setAnchorElUser(null);
    if (route === "sign-out") signOut({ router });
    else if (route === "full-sign-out") fullSignOut({ router });
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ title, route, isAuth }) => (!isAuth ? true : auth) && (
                <MenuItem key={title} onClick={() => handleCloseNavMenu(route)}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, route, isAuth }) => (!isAuth ? true : auth) && (
              <Button
                key={title}
                onClick={() => handleCloseNavMenu(route)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ title, route, isAuth }) => (!isAuth ? true : auth) && (
                <MenuItem key={title} onClick={() => handleCloseUserMenu(route)}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapState = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatch = (dispatch: Dispatch) => ({
  signOut: dispatch.user.signOut,
  fullSignOut: dispatch.user.fullSignOut,
});


export default connect(mapState, mapDispatch)(ResponsiveAppBar);
