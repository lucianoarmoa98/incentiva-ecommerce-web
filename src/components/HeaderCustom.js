import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Backdrop, CircularProgress, withStyles, ListItemText, ListItemIcon, ListItem, List, Divider, Drawer, useTheme, useMediaQuery, Tabs, Tab, Button, Avatar } from '@material-ui/core';
import { AccountCircle, Add, Assignment, CardGiftcard, ChevronLeft, ChevronRight, Home, Instagram, LockOpen, MenuSharp, Person, Update, WhatsApp, } from '@material-ui/icons';
import { Tooltip, Box } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import { COLOR_BACKGROUND_VERDER_AGUA, DrawerHeader, TEXT_HEADER, useStylesAppBarra } from '../styles/styles';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/action';
import logo from '../assets/logo.png';
import Footers from './Footers';

const drawerWidth = 240;

function HeaderCustom({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cargando, setCargando] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);



    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
    console.log("isMatch", isMatch);
    const classes = useStylesAppBarra();
    const isMenuOpen = Boolean(anchorEl);

    let history = useNavigate();
    let location = window.location.pathname;
    console.log("location", location)
    const dispatch = useDispatch();

    //---------------------------------acceder a los datos del LocalStorage
    let dataView = window.localStorage.getItem('dataUser');
    const { username } = JSON.parse(dataView || '{}');

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        if (newValue === 0) {
            history('/incentiva-ecommerce-web');
        } else if (newValue === 1) {
            history('/incentiva-ecommerce-web/hombres');
        } else if (newValue === 2) {
            history('/incentiva-ecommerce-web/mujeres');
        }
    };

    useEffect(() => {
        if (location === '/incentiva-ecommerce-web') {
            setValue(0);
        } else if (location === '/incentiva-ecommerce-web/hombres') {
            setValue(1);
        } else if (location === '/incentiva-ecommerce-web/mujeres') {
            setValue(2);
        }
    }, [location])


    //-------------------------------rutas
    const handleHome = () => {
        history('/incentiva-ecommerce-web');
    }

    const handleHombres = () => {
        history('/incentiva-ecommerce-web/hombres');
    }


    //--------------------------------cerrar sesion de login
    const handleMujeres = () => {
        history('/incentiva-ecommerce-web/mujeres');
    }


    //--------------------------------abrir menu de usuario
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //--------------------------------cerrar menu de usuario
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    //-----------------------------abrir el menu de navegacion
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    //-----------------------------cerrar el menu
    const handleDrawerClose = () => {
        setOpen(false);
    };




    const arrayMenu = [
        {
            id: 1,
            name: 'Inicio',
            icon: <Home style={{ color: TEXT_HEADER }} />,
            action: handleHome
        },
        {
            id: 2,
            name: 'Hombres',
            icon: <Person style={{ color: TEXT_HEADER }} />,
            action: handleHombres
        },
        {
            id: 3,
            name: 'Mujeres',
            icon: <CardGiftcard style={{ color: TEXT_HEADER }} />,
            action: handleMujeres
        }
    ]


    return (
        <Box>
            <Toolbar style={{}}>
                {isMatch ? (
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                >
                                    <MenuSharp style={{ color: TEXT_HEADER }} />
                                </IconButton>
                            </div>

                            <div style={{}}>
                                <img src={logo} alt="logo" style={{ height: 70 }} />
                            </div>
                        </div>


                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="persistent"
                            anchor="left"
                            open={open}
                            //cambiar el color del drawer
                            classes={{
                                paper: classes.colorDrawer
                            }}

                        >
                            <DrawerHeader style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <IconButton onClick={handleDrawerClose} style={{ color: TEXT_HEADER }} >
                                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                                </IconButton>
                                <img src={logo} alt="logo" style={{ width: 120, height: 70 }} />
                            </DrawerHeader>
                            <Divider />
                            <Divider />

                            {arrayMenu.map((item, index) => (
                                <List key={item.id}>
                                    <ListItem button onClick={item.action} >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />

                                    </ListItem>
                                    {index === arrayMenu.length - 1 ? null : <Divider />}
                                </List>
                            ))}
                        </Drawer>
                    </>
                ) : (

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <img src={logo} alt="logo" style={{ width: 120, height: 70 }} />

                        <Tabs
                            sx={{ marginLeft: "auto" }}
                            // indicatorColor="primary"
                            // textColor="primary"
                            onChange={handleChange}
                            value={value}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: TEXT_HEADER,
                                }
                            }}
                            //cambiar color del texto
                            style={{ color: TEXT_HEADER }}
                        >
                            <Tab label="Inicio" />
                            <Tab label="Hombres" />
                            <Tab label="Mujeres" />
                        </Tabs>



                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                {/*agregar icono de whatsapp*/}
                                <WhatsApp style={{ color: COLOR_BACKGROUND_VERDER_AGUA }} />
                            </IconButton>


                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                {/*agregar icono de instagram*/}
                                <Instagram style={{ color: '#d408e7', marginLeft: 10 }} />
                            </IconButton>
                        </div>
                    </div>
                )}
            </Toolbar>


            <div style={{ height: '100vh' }}>
                {children}
            </div>

            <Footers />

            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}

export default HeaderCustom;