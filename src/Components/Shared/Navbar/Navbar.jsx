import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const pages = ["Home", "Profile", "Dashboard","Contact Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, logOut } = React.useContext(AuthContext);
  console.log(user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Box sx={{ mb: 10 }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ borderRadius: "12px", backgroundColor: "White" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Avatar
              src="/K.png"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            ></Avatar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              KUBAR
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                fontWeight: 600,
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    sx={{ color: "black", fontWeight: 600 }}
                    onClick={handleCloseNavMenu}
                  >
                    {page === "Dashboard" && user ? (
                      <Link to={`/${page.toLowerCase()}/home` }>
                        <Button>{page}</Button>
                      </Link>
                    ) : (
                      <Link to={`/${page.toLowerCase()}`}>
                        <Button>{page}</Button>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Avatar
              src="/K.png"
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            ></Avatar>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              KUBAR
            </Typography>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  href={`/${page.toLowerCase()}`}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block",fontWeight:600 }}
                >
                  {page}
                </Button>
              ))}
            </Box> */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  sx={{ color: "black", fontWeight: 600 }}
                  onClick={handleCloseNavMenu}
                >
                  {page === "Dashboard" && user ? (
                    <Link to={`/${page.toLowerCase()}/home`}>
                      <Button>{page}</Button>
                    </Link>
                  ) : (
                    <Link to={`/${page.toLowerCase()}`}>
                      <Button>{page}</Button>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {user ? (
                <Typography
                  sx={{
                    display: { xs: "none", md: "flex" },
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  {user.displayName}
                </Typography>
              ) : (
                <Link to={"/registration"}>
                  <Button variant="contained">Registration</Button>
                </Link>
              )}
              {user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Photo" src={user.photoURL} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Link to={"/login"}>
                  <Button variant="contained">Login</Button>
                </Link>
              )}

              <Menu
                sx={{ mt: "45px", borderRadius: "16px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    sx={{ padding: 0, textAlign: "left" }}
                    onClick={handleCloseUserMenu}
                  >
                    {setting === "Logout" ? (
                      <Button onClick={handleLogOut}>Logout</Button>
                    ) : (
                      <Button fullWidth href={setting.toLowerCase()}>
                        {setting}
                      </Button>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;
