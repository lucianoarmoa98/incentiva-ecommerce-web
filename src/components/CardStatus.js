import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { COLOR_BACKGROUND_GRIS } from "../styles/styles";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import appFirebase from "../credenciales/credenciales";

const db = getFirestore(appFirebase);

const GriMobile = ({ data, status }) => {
    let history = useNavigate();

    const handleDetails = (item) => {
        history(`/incentiva-ecommerce-web/${status}/detalles-${status}/${item.id}`, { state: item })
    }


    return (
        <Box>
            {data.map((item, index) => {
                return (
                    <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }} onClick={() => handleDetails(item)}>
                        <img src={item.imagen} alt={item.nombre} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover' }} />
                        <Typography variant="h6" gutterBottom align="center">
                            {item.nombre}
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center">
                            {item.descripcion}
                        </Typography>

                        <Typography variant="body1" gutterBottom align="center" style={{
                            color: 'red',
                            fontWeight: 'bold',
                            backgroundColor: COLOR_BACKGROUND_GRIS,
                            borderRadius: 10,
                            padding: 10
                        }}>
                            Gs. {item.precio}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

const GridWeb = ({ data, status }) => {
    let history = useNavigate();


    const handleDetails = (item) => {
        history(`/incentiva-ecommerce-web/${status}/detalles-${status}/${item.id}`, { state: item })
    }

    return (
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            {data.map((item, index) => {
                return (
                    <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, width: '30%' }} onClick={() => handleDetails(item)}>
                        <img src={item.imagen} alt={item.nombre} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover' }} />
                        <Typography variant="h6" gutterBottom align="center">
                            {item.nombre}
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center">
                            {item.descripcion}
                        </Typography>

                        <Typography variant="body1" gutterBottom align="center" style={{
                            color: 'red',
                            fontWeight: 'bold',
                            backgroundColor: COLOR_BACKGROUND_GRIS,
                            borderRadius: 10,
                            padding: 10

                        }}>
                            Gs. {item.precio}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

const CardStatus = ({ status }) => {
    const [listaProductos, setListaProductos] = useState([]);
    const [textNotData, setTextNotData] = useState(true);

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const getProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, status));
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id });
                });
                console.log('docs', docs);
                // setListaProductos(docs);
                if (docs.length > 0) {
                    setListaProductos(docs);
                    setTextNotData(true);
                } else {
                    setTextNotData(false);
                }

            } catch (error) {
                console.log('error-listado', error);
                setListaProductos([]);
                setTextNotData(false);
            }

        }
        getProducts();
    }, [])





    return (
        <Box>
            {listaProductos.length > 0 ?
                <>
                    {isMatch ? <GriMobile data={listaProductos} status={status} /> : <GridWeb data={listaProductos} status={status} />}
                </>
                : (
                    <>
                        {textNotData ?
                            <LinearProgress />
                            :
                            <Typography variant="body1" gutterBottom align="center">
                                No se encontraron resultados
                            </Typography>
                        }
                    </>
                )}
        </Box>

    );
}

export default CardStatus;