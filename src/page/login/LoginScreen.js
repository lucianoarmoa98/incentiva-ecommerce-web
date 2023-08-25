import React, { useState } from 'react'
import { Backdrop, Box, Button, CircularProgress, Container, CssBaseline, IconButton, InputAdornment, makeStyles, Paper, Snackbar, TextField, Typography, withStyles } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import { COLOR_BACKGROUND_GRIS, CssTextField, useStylesLogin } from '../../styles/styles';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// import '../../styles/globalCss.css';
import { postLogin } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/action';
import logo from '../../assets/logo.png';

const credentials = {
    username: 'adminIcentiva',
    password: 'Z3JvdXBzSW5jZW50MjAyMyQ='
}


function LoginScreen({ }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStylesLogin();


    const dispatch = useDispatch();

    //---------------------------------ruta de redireccion
    let history = useNavigate();


    //---------------------------------cerrar modal de alerta
    const handleClose = () => {
        setOpen(false);
    };

    //-----------------------------evento de ingresar usuario
    const handleChangeUser = (e) => {
        const { value } = e.target;
        setUserName(value);
    }

    //-----------------------------evento de ingresar password
    const handleChangePas = (e) => {
        const { value } = e.target;
        setPassword(value);
    }


    //-----------------------------evento de iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();


        //usar trim para eliminar espacios en blanco
        if (userName.trim() === '' || password.trim() === '') {
            setOpen(true);
            setSeverity('error');
            setMensaje('Ingrese usuario y contraseña');
        } else {
            //-----------------------------datos de login para verificar con credentials
            let body = {};
            body.usernameOrEmail = userName;
            body.password = password;

            //desencriptar password
            let dataDesencriptada = atob(credentials.password);

            setCargando(true);
            //comparar datos de login con credentials
            if (userName === credentials.username && password === dataDesencriptada) {
                setCargando(false);
                dispatch(setToken(true));
                localStorage.setItem('dataUser', true);
                // //ir a la ruta de administrador, sin poder regresar a login
                history('/incentiva-ecommerce-web/admin', { replace: true });
            } else {
                console.log("datos incorrectos", body);
                setCargando(false);
                setOpen(true);
                setSeverity('error');
                setMensaje('Usuario o contraseña incorrecta');
            }



        }
    }

    //-----------------------------------------enviar datos con enter
    const eventEnter = (e) => {
        console.log("e", e.keyCode)
        if (e.keyCode === 13 && password.trim() !== '' && userName.trim() !== '') {
            handleSubmit(e);
        } else {
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className={classes.imagFondoLogin}>
            <div className={classes.centrarDiv}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper className={classes.paper}>

                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <img src={logo} alt="logo" style={{ height: 130, width: 200 }} />
                        </Box>

                        <div className={classes.form} >
                            <CssTextField
                                value={userName}
                                onChange={handleChangeUser}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Ingrese su Correo"
                                id="username"
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoCompleteType='email'
                                autoFocus
                            />

                            <CssTextField
                                value={password}
                                onChange={handleChangePas}
                                onKeyDown={eventEnter}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                // type="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="off"
                                autoCapitalize={'off'}
                                autoCorrect='off'
                                //habilitar ver contraseña
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}

                            />

                            <div className={classes.buttonSpacing}>
                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.buttonCrearCuenta}
                                >
                                    Iniciar sesión
                                </Button>
                            </div>

                            <Typography variant="body2" display="block" gutterBottom align="center" style={{ marginTop: 10, fontWeight: 'bold' }}>
                                Versión: {'1.0.0.0'}
                            </Typography>
                        </div>
                    </Paper>
                </Container>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} elevation={6} variant="filled" >
                    {mensaje}
                </Alert>
            </Snackbar>

            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default LoginScreen;

// export default connect(null, { guardarText, alertInit })(Login);
// withStyles(useStylesLogin)(Login);