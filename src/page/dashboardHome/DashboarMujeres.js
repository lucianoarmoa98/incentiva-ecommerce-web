import React, { useState } from "react";
import HeaderCustom from "../../components/HeaderCustom";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Lottie from 'react-lottie';
import animation from "../../assets/animation.json";
import { notPageStyles } from "../../styles/styles";
import CardStatus from "../../components/CardStatus";


const DashboardMujeres = () => {
    const theme = useTheme();
    //obtener el height de la pantalla
    let height = window.innerHeight;
    const classes = notPageStyles();



    return (
        <HeaderCustom>
            <CardStatus status={"mujeres"}/>
        </HeaderCustom>
    );
}

export default DashboardMujeres;