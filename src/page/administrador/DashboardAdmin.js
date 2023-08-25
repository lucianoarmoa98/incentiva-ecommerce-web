import React, { useEffect, useState } from "react";
import HeaderCustom from "../../components/HeaderCustom";
import { Backdrop, Box, Button, CircularProgress, IconButton, Tab, TextField, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useStylesAppBarra } from "../../styles/styles";
import AddCatalogos from "./AddCatalogos";


const DashboardAdmin = () => {
    const [value, setValue] = useState('1');
    const [cargando, setCargando] = useState(false);

    const classes = useStylesAppBarra();

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <HeaderCustom>
            <Box style={{}}>
         
                <Box style={{}}>
                    <TabContext value={value}>
                        <Box style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Agregar Nuevo Catálogo" value="1" />
                                {/* <Tab label="Catálogos Mujeres" value="2" /> */}
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <AddCatalogos />
                        </TabPanel>
{/* 
                        <TabPanel value="2">
                            <AddCatologosMujeres />
                        </TabPanel> */}
                    </TabContext>
                </Box>
            </Box>

            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </HeaderCustom>
    );
}

export default DashboardAdmin;