import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Backdrop, CircularProgress, withStyles, ListItemText, ListItemIcon, ListItem, List, Divider, Drawer, useTheme, useMediaQuery, Tabs, Tab, Button, Avatar } from '@material-ui/core';
import { AccountCircle, Add, Assignment, CardGiftcard, ChevronLeft, ChevronRight, Home, Instagram, LockOpen, MenuSharp, Person, ShoppingCart, Update, WhatsApp, } from '@material-ui/icons';
import { Tooltip, Box } from '@material-ui/core';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COLOR_BACKGROUND_VERDER_AGUA, DrawerHeader, TEXT_HEADER, useStylesAppBarra } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import Footers from './Footers';
import { setTabPosition, setToken } from '../redux/actions/action';

const drawerWidth = 240;

function HeaderCustom({ children, id }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(useSelector(state => state.reducerGlobal.tabPosition));


    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStylesAppBarra();
    const isMenuOpen = Boolean(anchorEl);

    let history = useNavigate();
    let location = window.location.pathname;
    const dispatch = useDispatch();

    let dataAdmin = localStorage.getItem('dataUser');

    const handleStoragePosition = () => {
        let position = localStorage.getItem('tabPosition');
        console.log("position--ruta", position);


        if (position !== null) {
            if (location === '/') {
                setValue(0);
                localStorage.setItem('tabPosition', 0)
            } else if (location === '/incentiva-ecommerce-web/hombres' || location === `/incentiva-ecommerce-web/hombres/detalles-hombres/${id}`) {
                setValue(1);
                localStorage.setItem('tabPosition', 1)
            } else if (location === '/incentiva-ecommerce-web/mujeres' || location === `/incentiva-ecommerce-web/mujeres/detalles-mujeres/${id}`) {
                setValue(2);
                localStorage.setItem('tabPosition', 2)
            } else if (location === '/incentiva-ecommerce-web/admin' || location === '/incentiva-ecommerce-web/admin') {
                setValue(3);
                localStorage.setItem('tabPosition', 3)
            } else {
                setValue(parseInt(position));
                localStorage.setItem('tabPosition', parseInt(position))
            }
        } else {
            setValue(0)
        }
    }

    useEffect(() => {
        handleStoragePosition();
    }, [handleStoragePosition])

    const handleSetPosition = (value) => {
        //setear el valor del tab al state global
        dispatch(setTabPosition(value))
        //setear el valor del tab al localstorage
        localStorage.setItem('tabPosition', value)
    }




    const handleChange = (event, newValue) => {
        // setValue(newValue);
        if (newValue === 0) {
            // setValue(newValue);
            handleSetPosition(newValue)
            history('/');
        } else if (newValue === 1) {
            // setValue(newValue);
            handleSetPosition(newValue)
            history('/incentiva-ecommerce-web/hombres');
        } else if (newValue === 2) {
            // setValue(newValue);
            handleSetPosition(newValue)
            history('/incentiva-ecommerce-web/mujeres');
        } else if (newValue === 3) {
            // setValue(newValue);
            handleSetPosition(newValue)
            history('/incentiva-ecommerce-web/admin');
        }
    };


    //-------------------------------rutas
    const handleHome = () => {
        history('/');
    }

    const handleHombres = () => {
        history('/incentiva-ecommerce-web/hombres');
    }

    const handleMujeres = () => {
        history('/incentiva-ecommerce-web/mujeres');
    }

    const handleLogin = () => {
        history('/incentiva-ecommerce-web/login');
    }


    //-------------------------------rutas externas
    const handleUrlInstagram = () => {
        let url = 'https://www.instagram.com/incentivapy_';

        //abrir en una nueva pestaña
        window.open(url, '_blank');
    }

    const handlePhoneWhatsApp = () => {
        let url = 'https://api.whatsapp.com/send?phone=595991905663&text=Hola%20Incentiva%20Py';

        //abrir en una nueva pestaña
        window.open(url, '_blank');
    }

    const handleClose = () => {
        localStorage.removeItem('dataUser');
        dispatch(setToken(null));
        history('/');
    };





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
                            {dataAdmin ? <Tab label="Cargar Catálogo" /> : null}
                        </Tabs>



                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {dataAdmin &&
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    {/*agregar icono de cerrar sesion*/}
                                    <LockOpen style={{ color: TEXT_HEADER }} />
                                </IconButton>
                            }

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            // onClick={handleClose}
                            >
                                {/*agregar icono de compras*/}
                                <ShoppingCart style={{ color: TEXT_HEADER }} />
                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleLogin}
                            >
                                {/*agregar icono de usuario*/}
                                <AccountCircle style={{ color: TEXT_HEADER }} />
                            </IconButton>

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handlePhoneWhatsApp}
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
                                onClick={handleUrlInstagram}
                            // style={{ marginLeft: 10 }}
                            >
                                {/*agregar icono de instagram*/}
                                <Instagram style={{ color: '#d408e7' }} />
                            </IconButton>
                        </div>
                    </div>
                )}
            </Toolbar>


            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {children}
            </div>

            <Footers />
        </Box>
    );
}

export default HeaderCustom;