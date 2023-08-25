import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";


const Footers = () => {

    return (
        <footer style={{flexShrink: 0, padding: '10px 0'}}>
            <Typography variant="caption" display="block" gutterBottom align="center">
                © 2023 Incentiva Groups. Todos los derechos reservados.
            </Typography>
        </footer>
    );
}

export default Footers;