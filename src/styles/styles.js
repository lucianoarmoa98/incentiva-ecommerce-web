import { TextField, makeStyles, styled } from "@material-ui/core";
import { brown, green } from "@material-ui/core/colors";
import imgFondo from '../assets/homeFondo.png';

export const COLOR_BACKGROUND_VERDER_AGUA = '#48c590';
export const COLOR_BACKGROUND_VERDE_CLARO = "#e2f7ed";
export const COLOR_BACKGROUND_GRIS = "#ebeef1";
export const COLOR_BACKGROUND_GRIS_OSCURO = "#c1c1c1";
export const TEXT_HEADER = "#4a4a4a";//#262626

let altoPantalla = window.innerHeight;

//---------------------------------------------Estilo para page 404
export const notPageStyles = makeStyles(theme => ({
    root: {
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

//-----------------------------contenedor de color
export const CssTextField = styled(TextField)({


    '& .MuiOutlinedInput-root': {
        "&.Mui-focused fieldset": {
            // borderColor: brown[600],
            borderColor: COLOR_BACKGROUND_VERDER_AGUA,
        },
        '&:hover fieldset': {
            // borderColor: brown[600],
            borderColor: COLOR_BACKGROUND_VERDER_AGUA,
        },
    },
    //agregar color al label
    '& .MuiInputLabel-outlined': {
        color: COLOR_BACKGROUND_GRIS_OSCURO,
    },
});

//--------------------------------------estilo de login login.js

export const useStylesLogin = makeStyles(theme => ({
    centrarDiv: {
        // height: '100vh',
        height: altoPantalla,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(3),
        borderRadius: 10,
    },
    imagFondoLogin: {
        backgroundColor: '#f2f9f9'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        // marginTop: theme.spacing(1)
    },
    submit: {
        // margin: theme.spacing(3, 0, 2),
        background: brown[600],
        color: 'white',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    buttonSpacing: {
        marginTop: theme.spacing(2),
        // display: 'grid',
        // gap: '10px',
    },
    buttonCrearCuenta: {
        background: COLOR_BACKGROUND_VERDER_AGUA,
        color: 'white',
    }
}));

//------------------------------------------------Barra de navegacion
export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


//-----------------------------------------estilo dashboar componente AppBarra.js
export const useStylesAppBarra = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    colorApp: {
        backgroundColor: '#333'
    },
    colorDrawer: {
        background: '#f7f7f7',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    },
    contentItem: {
        justifyContent: 'center'
    },
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
        //obtener el alto del toolbar, para que el contenido no se vea abajo del toolbar
        ...theme.mixins.toolbar,

      }
}));