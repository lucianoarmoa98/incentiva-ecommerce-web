import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { COLOR_BACKGROUND_GRIS, COLOR_BACKGROUND_VERDER_AGUA, notPageStyles } from "../../styles/styles";
import logo from '../../assets/logo.png';
import { Instagram, Web, WhatsApp } from "@material-ui/icons";
import Footers from "../../components/Footers";
import { useNavigate } from "react-router-dom";

const InicioPage = () => {
    const theme = useTheme();
    //obtener el height de la pantalla

    let history = useNavigate();

    const handleRuteDashboard = () => {
        history('/');
    }

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


    return (
        <Box style={{}}>
            <Box>
                <Box style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                    <img src={logo} alt="logo" style={{ height: 90, width: 150 }} />
                </Box>
                <Box style={{
                    maxWidth: 500, margin: 'auto', marginTop: 20,
                }}>
                    <Box style={{
                        backgroundColor: COLOR_BACKGROUND_GRIS, borderRadius: 10, padding: 10,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }} onClick={handleRuteDashboard}>
                        <Web style={{ fontSize: 50, color: '#3f51b5' }} />

                        <Typography variant="subtitle1" gutterBottom align="center">
                            Ir a la página principal
                        </Typography>

                        <Box />
                    </Box>

                    <Box style={{
                        backgroundColor: COLOR_BACKGROUND_GRIS, borderRadius: 10, padding: 10, marginTop: 10,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }} onClick={handlePhoneWhatsApp}>
                        <WhatsApp style={{ fontSize: 50, color: COLOR_BACKGROUND_VERDER_AGUA }} />

                        <Typography variant="subtitle1" gutterBottom align="center">
                            WhatsApp
                        </Typography>

                        <Box />
                    </Box>

                    <Box style={{
                        backgroundColor: COLOR_BACKGROUND_GRIS, borderRadius: 10, padding: 10, marginTop: 10,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }} onClick={handleUrlInstagram}>
                        <Instagram style={{ fontSize: 50, color: '#d408e7' }} />

                        <Typography variant="subtitle1" gutterBottom align="center">
                            Instagram
                        </Typography>

                        <Box />
                    </Box>
                </Box>
            </Box>

            <Box style={{
                position: 'absolute',
                bottom: 0,
            }}>
                <Footers />
            </Box>
        </Box>
    );
}

export default InicioPage;