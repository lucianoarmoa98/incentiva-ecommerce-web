import React from "react";
import { notPageStyles } from "../../styles/styles";
import Lottie from 'react-lottie';
import animation from "../../assets/animation.json";
import { Box, Button, Typography } from "@material-ui/core";

function ErrorPage() {
    const classes = notPageStyles();

    return (
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
                    height={'50vh'}
                    width={'50vh'}
                />
            </Box>

            <Typography variant="h6" gutterBottom align="center">
                ¡Ups! No encontramos la página que buscas
            </Typography>

            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    href="/"
                >
                    Ir al inicio
                </Button>
            </Box>

        </div>
    );
}

export default ErrorPage;