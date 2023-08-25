import React, { useEffect, useState } from "react";
import HeaderCustom from "../components/HeaderCustom";
import { Backdrop, Box, Button, CircularProgress, Input, LinearProgress, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { COLOR_BACKGROUND_GRIS, COLOR_BACKGROUND_GRIS_OSCURO, useStylesAppBarra } from "../styles/styles";
import { CardGiftcard } from "@material-ui/icons";
import ErrorPage from "../page/errorPage/ErrorPage";
import appFirebase from "../credenciales/credenciales";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(appFirebase);


const GriMobile = ({ data }) => {

    return (
        <Box>
            {data && (
                <Box style={{ padding: 10 }}>
                    <img src={data.imagen} alt={data.nombre} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover' }} />
                    <Typography variant="h6" gutterBottom align="center">
                        {data.nombre}
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        {data.descripcion}
                    </Typography>

                    <Typography variant="h4" gutterBottom align="center" style={{
                        fontWeight: 'bold',
                    }}>
                        Gs. {data.precio}
                    </Typography>

                    <Box style={{ marginBottom: 20 }}>
                        <Typography variant="body1" gutterBottom style={{ marginBottom: 10 }}>
                            Tamaños
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {data.tamanos.map((item, index) => (
                                <span
                                    key={index}
                                    style={{
                                        border: `1px solid ${COLOR_BACKGROUND_GRIS_OSCURO}`,
                                        padding: 10,
                                        borderWidth: 1,
                                        borderTopLeftRadius: index === 0 ? 5 : 0,
                                        borderBottomLeftRadius: index === 0 ? 5 : 0,
                                        borderTopRightRadius: index === data.tamanos.length - 1 ? 5 : 0,
                                        borderBottomRightRadius: index === data.tamanos.length - 1 ? 5 : 0,
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </Typography>
                    </Box>

                    <Box style={{ marginBottom: 20 }}>
                        <Typography variant="body1" gutterBottom style={{ marginBottom: 10 }}>
                            Colores
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {data.colores.map((item, index) => (
                                <span
                                    key={index}
                                    style={{
                                        border: `1px solid ${COLOR_BACKGROUND_GRIS_OSCURO}`,
                                        padding: 10,
                                        borderWidth: 1,
                                        borderTopLeftRadius: index === 0 ? 5 : 0,
                                        borderBottomLeftRadius: index === 0 ? 5 : 0,
                                        borderTopRightRadius: index === data.colores.length - 1 ? 5 : 0,
                                        borderBottomRightRadius: index === data.colores.length - 1 ? 5 : 0,
                                    }}
                                >
                                    {item}
                                </span>
                            ))}
                        </Typography>
                    </Box>

                    <Box style={{ backgroundColor: '#d4edd9', borderRadius: 10, padding: 10 }}>
                        <Typography variant="body2" gutterBottom style={{
                            color: '#155724',
                            justifyContent: 'flex-start',
                            display: 'flex',
                            alignItems: 'center'
                        }} >
                            <CardGiftcard style={{ color: '#155724' }} />
                            Tenés envíos gratis a partir de Gs. 300.000.
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{
                            color: '#155724',
                        }} >
                            La promoción se aplica a las siguientes ciudades: Asunción, Fernando de la Mora, Lambaré, Luque, Mariano Roque Alonso, San Lorenzo.
                        </Typography>
                    </Box>

                    <Box style={{ marginTop: 20 }}>
                        <Typography variant="body1" gutterBottom>
                            Cantidad
                        </Typography>

                        <Box style={{
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <TextField
                                id="outlined-number"
                                type="number"
                                variant="outlined"
                                //centrar el texto en el input
                                style={{
                                    textAlign: 'center',
                                    width: 100,
                                    marginRight: 10
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: 5,
                                    height: 50,
                                    width: 200,
                                    backgroundColor: '#028532'
                                }}
                            >
                                Agregar al carrito
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )
            }
        </Box>
    );
}

const GridWeb = ({ data, collection, id }) => {
    const [cargando, setCargando] = useState(false);

    let history = useNavigate();

    const classes = useStylesAppBarra();

    //eliminar detalle de firebase
    const deleteData = async () => {
        console.log('data', data);
        setCargando(true);
        try {
            const docRef = doc(db, collection, id);
            await deleteDoc(docRef);
            setCargando(false);
            //ir atras
            history(-1);
        } catch (error) {
            console.log('error', error);
            setCargando(false);
        }
    }

    let dataAdmin = localStorage.getItem('dataUser');

    return (
        <Box>
            {data && (
                <Box style={{
                    display: 'flex',
                }}>
                    <img src={data.imagen} alt={data.nombre} style={{
                        height: 400,
                        width: '50%',
                        objectFit: 'cover',
                        borderRadius: 10,
                        padding: 10
                    }} />
                    <Box>
                        <Typography variant="h3" gutterBottom align="center">
                            {data.nombre}
                        </Typography>

                        {dataAdmin && (
                            <Box style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        borderRadius: 5,
                                        height: 50,
                                        width: 200,
                                        backgroundColor: '#ff2323'
                                    }}
                                    onClick={() => deleteData()}
                                >
                                    Eliminar
                                </Button>
                            </Box>
                        )}



                        <Typography variant="body1" gutterBottom >
                            {data.descripcion}
                        </Typography>

                        <Typography variant="h4" gutterBottom style={{
                            fontWeight: 'bold',
                        }}>
                            Gs. {data.precio}
                        </Typography>


                        <Box style={{ marginBottom: 20 }}>
                            <Typography variant="body1" gutterBottom style={{ marginBottom: 10 }}>
                                Tamaños
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {data.tamanos.map((item, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            border: `1px solid ${COLOR_BACKGROUND_GRIS_OSCURO}`,
                                            padding: 10,
                                            borderWidth: 1,
                                            borderTopLeftRadius: index === 0 ? 5 : 0,
                                            borderBottomLeftRadius: index === 0 ? 5 : 0,
                                            borderTopRightRadius: index === data.tamanos.length - 1 ? 5 : 0,
                                            borderBottomRightRadius: index === data.tamanos.length - 1 ? 5 : 0,
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </Typography>
                        </Box>

                        <Box style={{ marginBottom: 20 }}>
                            <Typography variant="body1" gutterBottom style={{ marginBottom: 10 }}>
                                Colores
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {data.colores.map((item, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            border: `1px solid ${COLOR_BACKGROUND_GRIS_OSCURO}`,
                                            padding: 10,
                                            borderWidth: 1,
                                            borderTopLeftRadius: index === 0 ? 5 : 0,
                                            borderBottomLeftRadius: index === 0 ? 5 : 0,
                                            borderTopRightRadius: index === data.colores.length - 1 ? 5 : 0,
                                            borderBottomRightRadius: index === data.colores.length - 1 ? 5 : 0,
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </Typography>
                        </Box>

                        <Box style={{ backgroundColor: '#d4edd9', borderRadius: 10, padding: 10 }}>
                            <Typography variant="body2" gutterBottom style={{
                                color: '#155724',
                                justifyContent: 'flex-start',
                                display: 'flex',
                                alignItems: 'center'
                            }} >
                                <CardGiftcard style={{ color: '#155724' }} />
                                Tenés envíos gratis a partir de Gs. 300.000.
                            </Typography>
                            <Typography variant="body2" gutterBottom style={{
                                color: '#155724',
                            }} >
                                La promoción se aplica a las siguientes ciudades: Asunción, Fernando de la Mora, Lambaré, Luque, Mariano Roque Alonso, San Lorenzo.
                            </Typography>
                        </Box>

                        <Box style={{ marginTop: 20 }}>
                            <Typography variant="body1" gutterBottom>
                                Cantidad
                            </Typography>

                            <Box style={{
                                marginTop: 10,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <TextField
                                    id="outlined-number"
                                    type="number"
                                    variant="outlined"
                                    //centrar el texto en el input
                                    style={{
                                        textAlign: 'center',
                                        width: 100,
                                        marginRight: 10
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        borderRadius: 5,
                                        height: 50,
                                        width: 200,
                                        backgroundColor: '#028532'
                                    }}
                                >
                                    Agregar al carrito
                                </Button>
                            </Box>
                        </Box>



                    </Box>
                </Box>
            )
            }

            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
}


const CardDetails = () => {
    const [data, setData] = useState(null);
    const [textNotData, setTextNotData] = useState(true);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    const localitation = useLocation();
    console.log('info-rutas==>>', localitation);
    //usar params para obtener el id de la url
    const { id, detalles } = useParams();
    console.log('params==>>', detalles);

    let collection = detalles === 'detalles-mujeres' ? 'mujeres' : 'hombres';

    const getData = async () => {
        try {
            console.log('collection', collection);
            const docRef = doc(db, collection, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setData(docSnap.data());
                setTextNotData(true);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setData(null);
                setTextNotData(false);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <HeaderCustom id={id}>
            {data !== null ? (
                <>
                    {isMatch ? <GriMobile data={data} /> : <GridWeb data={data} collection={collection} id={id} />}
                </>
            ) : (
                <>
                    {textNotData ?
                        <LinearProgress />
                        :
                        <Typography variant="h3" gutterBottom align="center">
                            No se encontraron resultados
                        </Typography>
                    }
                </>
            )}

        </HeaderCustom>
    );
}

export default CardDetails;