import React, { useState } from 'react'
import { Backdrop, Button, CircularProgress, Container, CssBaseline, IconButton, InputAdornment, makeStyles, Paper, Snackbar, TextField, Typography, withStyles } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
// import { useStylesLogin, CssTextField } from '../../styles/styles';
import { CssTextField, useStylesLogin } from '../../styles/styles';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// import '../../styles/globalCss.css';
import { postLogin } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/action';





function LoginScreen({ }) {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
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
            //-----------------------------datos de login para enviar a backend
            let body = {};
            body.usernameOrEmail = userName;
            body.password = password;

            setCargando(true);

            postLogin(body)
                .then(response => {
                    if (response.data.status === "Activo") {
                        localStorage.setItem('dataUser', JSON.stringify(response.data));
                        // setTimeout(() => setCargando(false), 2000);
                        setCargando(false);
                        setOpen(true);
                        setSeverity('success');
                        setMensaje(response.data.mensaje);
                        setUserName("");
                        setPassword("");

                        setTimeout(() => dispatch(setToken(response.data)), 1150);

                    } else {
                        setOpen(true);
                        setSeverity('error');
                        setMensaje("Usuario inactivo, contacte al administrador");
                        setCargando(false);
                    }

                })
                .catch(error => {
                    console.log("errorSesion", error);
                    setOpen(true);
                    setSeverity('error');
                    setMensaje(error.mensaje);
                    setCargando(false);
                })
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
                        <Typography component="h1" variant="h5" align='center'>
                            Iniciar sesion
                        </Typography>

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
                                    className={classes.submit}
                                >
                                    Iniciar sesión
                                </Button>


                                <Button
                                    fullWidth
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={classes.buttonCrearCuenta}
                                >
                                    Crear cuenta
                                </Button>
                            </div>

                            <p><b>Versión: {'0.0.1'}</b></p>

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