import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeaderCustom from "../../components/HeaderCustom";
import { useStylesAppBarra } from "../../styles/styles";
import fondo1 from "../../assets/fondoUno.png";
import fondo2 from "../../assets/fondoDos.png";
import fondo3 from "../../assets/fondoTres.png";
import fondo4 from "../../assets/fondoCuatro.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";

function DashboardHome() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    const arrayImagenes = [
        {
            url: fondo3,
            descripcion: "Estilo en movimiento. Descubre nuestra nueva colección de ropa deportiva en Incentiva. Tu rendimiento, tu estilo, tu elección."
        },
        {
            url: fondo1,
            descripcion: "Dale vida a tus entrenamientos con nuestra ropa deportiva de alta calidad. Rendimiento y estilo en cada prenda, solo en Incentiva."
        },
        {
            url: fondo2,
            descripcion: "Eleva tus rutinas con la última moda deportiva. Comodidad y diseño se unen en nuestra colección. ¡Descúbrela en Incentiva!"
        },
        {
            url: fondo4,
            descripcion: "Marca la diferencia con nuestra ropa deportiva premium. Diseñada para destacar en el gimnasio y más allá. Incentiva, tu mejor elección."
        }
    ];


    return (
            <HeaderCustom>
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showIndicators={true}
                        showThumbs={false}
                        // showArrows={false}
                        dynamicHeight={true}
                        interval={4000}
                        transitionTime={1000}
                        emulateTouch={true}
                        width="100%"
                        // animationHandler="fade"
                        showStatus={false}
                    >
                        {
                            arrayImagenes.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img src={item.url} alt={item.titulo} style={{
                                            borderRadius: 10,
                                            // height: height - 100,
                                            height: '50vh',
                                            width: '100%',
                                            objectFit: 'cover'
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            color: 'white',
                                            textAlign: 'center',
                                            padding: 20,
                                            borderRadius: 10,
                                            backgroundColor: 'rgba(0,0,0,0.5)'
                                        }}>
                                            <Typography variant="body1" gutterBottom>
                                                {item.descripcion}
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Carousel>

                    <Box>
                        <Typography variant="h3" style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                            Desafía tus límites
                        </Typography>

                        <Typography variant="h6" style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                            Abraza el estilo. Encuentra tu impulso con la ropa deportiva de Incentiva. Eleva cada movimiento, conquista cada meta. Tu éxito, tu elección.
                        </Typography>
                    </Box>

            </HeaderCustom>
    );
}

export default DashboardHome;