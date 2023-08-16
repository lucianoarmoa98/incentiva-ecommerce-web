import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";


const Footers = () => {
    const theme = useTheme();


    return (
        <div>
            <footer style={{
                // position: 'absolute',
                // bottom: 0,
                // padding: 5,
                // borderRadius: 3,
            }}>
                <Typography variant="caption" display="block" gutterBottom align="center">
                    © 2023 Incentiva Groups. Todos los derechos reservados.
                </Typography>
            </footer>
        </div>
    );
}

export default Footers;