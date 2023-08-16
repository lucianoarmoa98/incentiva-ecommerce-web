import React, { useState } from "react";
import HeaderCustom from "../../components/HeaderCustom";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Lottie from 'react-lottie';
import animation from "../../assets/animation.json";
import { notPageStyles } from "../../styles/styles";


const DashboardHombres = () => {
    const theme = useTheme();
    //obtener el height de la pantalla
    let height = window.innerHeight;

    const classes = notPageStyles();


    return (
        <HeaderCustom>
            <div className={classes.root}>
                <Box>
                    <Lottie
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: animation,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={height > 600 ? '50vh' : '100vh'}
                        width={'auto'}
                    />
                </Box>
                <Typography variant="h6" gutterBottom align="center">
                    ¡Ups! No encontramos trabajando, pronto estaremos de vuelta.
                </Typography>
            </div>
        </HeaderCustom>
    );
}

export default DashboardHombres;