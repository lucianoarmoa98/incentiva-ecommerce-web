import React, { useState } from "react";
import HeaderCustom from "../../components/HeaderCustom";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Lottie from 'react-lottie';
import animation from "../../assets/animation.json";
import { notPageStyles } from "../../styles/styles";
import CardStatus from "../../components/CardStatus";


const DashboardHombres = () => {
    const theme = useTheme();

    return (
        <HeaderCustom>
            <CardStatus status={"hombres"}/>
        </HeaderCustom>
    );
}

export default DashboardHombres;