import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";


const GriMobile = ({ data }) => {

    return (
        <Box>
            {data.map((item, index) => {
                return (
                    <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                        <img src={item.imagen} alt={item.nombre} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover' }} />
                        <Typography variant="h6" gutterBottom align="center">
                            {item.nombre}
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center">
                            {item.descripcion}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

const GridWeb = ({ data }) => {

    return (
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            {data.map((item, index) => {
                return (
                    <Box key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 10, width: '30%' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ borderRadius: 10, height: 200, width: '100%', objectFit: 'cover' }} />
                        <Typography variant="h6" gutterBottom align="center">
                            {item.nombre}
                        </Typography>
                        <Typography variant="body1" gutterBottom align="center">
                            {item.descripcion}
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    );
}

const Categorias = () => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    const arrayCategorias = [
        {
            nombre: 'Ropa Deportiva',
            descripcion: 'Descubre nuestra amplia selección de ropa deportiva de alta calidad para hombres y mujeres.',
            imagen: 'https://res.cloudinary.com/dayx2unij/image/upload/v1692283709/d4hs30jdrvj22fvkye1q.png'
        },
        {
            nombre: 'Calzados Deportivos',
            descripcion: 'Encuentra los calzados perfectos para cada deporte y actividad, diseñadas para brindar comodidad y rendimiento.',
            imagen: 'https://www.myshuzz.com.py/wp-content/uploads/2022/10/WMORVP3-001.jpg'
        },
        {
            nombre: 'Medias y Ropa Interior Deportiva',
            descripcion: 'Mejora tu comodidad y rendimiento con nuestra selección de medias y ropa interior deportiva de alta calidad.',
            imagen: 'https://www.myshuzz.com.py/wp-content/uploads/2023/01/S20273-6-8-.jpg'
        },
        {
            nombre: 'Remeras Básicas para Caballeros',
            descripcion: 'Descubre nuestra colección de remeras básicas para hombres, ideales para el día a día y para tus actividades deportivas.',
            imagen: 'https://www.myshuzz.com.py/wp-content/uploads/2022/06/BK0797.jpg'
        }
    ];



    return (
        <Box>
            {isMatch ? <GriMobile data={arrayCategorias} /> : <GridWeb data={arrayCategorias} />}
        </Box>

    );
}

export default Categorias;