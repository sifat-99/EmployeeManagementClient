import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Link as NavLink, Outlet } from "react-router-dom";
import { Button, Container } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import CachedIcon from "@mui/icons-material/Cached";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainDashboard() {
  const { user } = React.useContext(AuthContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [role, setRole] = React.useState("");
  const axiosPublic = useAxiosPublic();

  const [navItems, setNavItems] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    axiosPublic.get(`/employees/${user.email}`).then((res) => {
      const adminItems = [
        {
          name: "Admin-Home",
          icon: <AddHomeIcon />,
        },
        {
          name: "Admin-Profile",
          icon: <AccountBoxIcon />,
        },
      ];
      const HrItems = [
        {
          name: "HR-Home",
          icon: <AddHomeIcon />,
        },
        {
          name: "Progress",
          icon: <CachedIcon />,
        },
        {
          name: "HR-Profile",
          icon: <AccountBoxIcon />,
        },
        {
          name: "HR-Payment History",
          icon: <PaidIcon />,
        },
      ];
      const userItems = [
        {
          name: "User-Home",
          icon: <AddHomeIcon />,
        },
        {
          name: "User-Profile",
          icon: <AccountBoxIcon />,
        },
        {
          name: "User-Payment History",
          icon: <PaidIcon />,
        },
        {
          name: "Work Sheet",
          icon: <FolderOpenIcon />,
        },
      ];

      setRole(res.data.role);
      console.log(role)

      if (res.data.role === "admin") {
        setNavItems(adminItems);
      } 
      if (res.data.role === "hr") {
        setNavItems(HrItems);
      }
      else
      {
        setNavItems(userItems);
      }
    });
  }, [axiosPublic, user.email, role]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Container
            sx={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant={open ? "h6" : "h5"}
              sx={{
                fontWeight: { sm: 500, md: 700 },
                fontSize: { sm: "1.5rem", md: "2rem" },
                display: { xs: "none", sm: "block" },
              }}
              noWrap
              component="div"
            >
              Dashboard
            </Typography>
            <NavLink to={"/"}>
              <Button variant="contained" sx={{ color: "white" }}>
                home
              </Button>
            </NavLink>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                to={`/dashboard/${text.name.toLowerCase()}`}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
