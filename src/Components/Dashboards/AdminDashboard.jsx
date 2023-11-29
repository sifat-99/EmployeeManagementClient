import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Class, ClassOutlined, ClassSharp, ClassTwoTone, ManageAccountsTwoTone, Payment, Settings } from '@mui/icons-material';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import useStudent from '../../../hooks/useStudent';
import useInstructor from '../../../hooks/useInstructor';
import { motion } from "framer-motion"

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [isAdmin] = useAdmin();
    const [isStudent] = useStudent();
    const [isInstructor] = useInstructor();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    console.log('admin', isAdmin);
    console.log('ins', isInstructor);
    console.log('stu', isStudent);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />

                <List component="nav">
                    {isAdmin && (
                        <React.Fragment>
                            <ListItemButton component={RouterLink} to="././manageclasses">
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Manage Classes" />
                            </ListItemButton>

                            <ListItemButton component={RouterLink} to="././manageusers">
                                <ListItemIcon>
                                    <ManageAccountsTwoTone />
                                </ListItemIcon>
                                <ListItemText primary="Manage Role" />
                            </ListItemButton>
                        </React.Fragment>
                    )}

                    {isInstructor && (
                        <React.Fragment>
                            <ListItemButton component={RouterLink} to="././Myclasses">
                                <ListItemIcon>
                                    <ClassSharp />
                                </ListItemIcon>
                                <ListItemText primary="My Classes" />
                            </ListItemButton>
                            <ListItemButton component={RouterLink} to="././addaclass">
                                <ListItemIcon>
                                    <ClassTwoTone />
                                </ListItemIcon>
                                <ListItemText primary="Add A Class" />
                            </ListItemButton>
                        </React.Fragment>
                    )}

                    {isStudent && (
                        <React.Fragment>
                            <Box m={1}>
                            <motion.button whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}>
                                <ListItemButton component={RouterLink} to="././myselectedclasses">
                                    <ListItemIcon>
                                        <ClassOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary="My Selected Classes" />
                                </ListItemButton>
                            </motion.button>
                            </Box>

                            <Box m={1}>
                            <motion.button whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}>
                                <ListItemButton component={RouterLink} to="././myenrolledclasses">
                                    <ListItemIcon>
                                        <Class />
                                    </ListItemIcon>
                                    <ListItemText primary="My Enrolled Classes" />
                                </ListItemButton>
                            </motion.button>
                            </Box>


                            <Box m={1}>
                            <motion.button whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}>
                                <ListItemButton component={RouterLink} to="././paymenthistory">
                                    <ListItemIcon>
                                        <Payment />
                                    </ListItemIcon>
                                    <ListItemText primary="Payment History" />
                                </ListItemButton>
                            </motion.button>
                            </Box>

                        </React.Fragment>
                    )}

                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}