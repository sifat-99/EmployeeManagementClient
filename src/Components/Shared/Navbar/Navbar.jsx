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
import { Link } from "react-router-dom";
import { ListItemButton, ListItemText } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useEmployee from "../../hooks/useEmployee";

const pages = ["Home", "Profile", "Dashboard", "Contact Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logOut, setLoading } = useAuth();
  const [dashboardLink, setDashboardLink] = useState(null);

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

  const axiosPublic = useAxiosPublic();
  const [role, setRole] = useState(null);
  const [allData,refetch] = useEmployee()
  console.log(allData)


  useEffect(() => {
    if (user) {
     
      console.log(user.email);
      axiosPublic.get(`/user/role/${user.email}`)
      .then((res) => {
        console.log(res.data);
        setRole(res.data.role);
        console.log(res.data.role);


        // const role = allData.filter((data) => data.email === user.email);
        // console.log(role)

        if (res.data.role === "admin") {
          setDashboardLink("admin-home");
        }
        if (res.data.role === "hr") {
          setDashboardLink("hr-home");
        }
        if (res.data.role === "user") {
          setDashboardLink("user-home");
        }



      })
      refetch()
    }
  }, [user, setLoading, axiosPublic,allData,refetch]);

  console.log(role);

  console.log(dashboardLink)



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
                      <Link to={`/${page.toLowerCase()}/${dashboardLink}`}>
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
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  sx={{ color: "black", fontWeight: 700 }}
                  onClick={handleCloseNavMenu}
                >
                  {page === "Dashboard" ? (
                    <ListItemButton to={`/${page.toLowerCase()}/${dashboardLink}`}>
                      <ListItemText
                        primary={page}
                        sx={{ opacity: open ? 1 : 0, fontWeight: 700 }}
                      />
                    </ListItemButton>
                  ) : (
                    <ListItemButton to={`/${page.toLowerCase()}`}>
                      <ListItemText
                        primary={page}
                        sx={{ opacity: open ? 1 : 0, fontWeight: 700 }}
                      />
                    </ListItemButton>
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
                      <Button fullWidth href={`${setting.toLowerCase()}/${dashboardLink}`}>
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
