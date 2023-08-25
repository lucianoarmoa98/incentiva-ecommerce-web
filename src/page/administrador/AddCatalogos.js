import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, Tab, TextField, Typography } from "@material-ui/core";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import appFirebase from "../../credenciales/credenciales";
import { useStylesAppBarra } from "../../styles/styles";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";


const AddCatalogos = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const [colores, setColores] = useState('');
    const [coloresArray, setColoresArray] = useState([]);
    const [tamanos, setTamanos] = useState('');
    const [tamanosArray, setTamanosArray] = useState([]);
    const [categoria, setCategoria] = useState('hombres');
    const [dataHombre, setDataHombre] = useState({
        nombre: '',
        descripcion: '',
        descuento: '',
        codProducto: '',
        imagen: '',
        precio: '',
        tamanos: [],
        colores: []
    });

    const classes = useStylesAppBarra();
    const storage = getStorage(appFirebase);
    const db = getFirestore(appFirebase);


    useEffect(() => {
        setDataHombre({ ...dataHombre, tamanos: tamanosArray });
    }, [tamanosArray]);

    useEffect(() => {
        setDataHombre({ ...dataHombre, colores: coloresArray });
    }, [coloresArray]);

    const handleChange = (event) => {
        setCategoria(event.target.value);
    };

    //---------------------------------cerrar modal de alerta
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = (e) => {
        const storageRef = ref(storage, `catalogos/${e.target.files[0].name}`);
        setCargando(true);
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            setCargando(false);
            setOpen(true);
            setSeverity('success');
            setMensaje('Se subió correctamente');
            console.log('Uploaded a blob or file!');
            getDownloadURL(ref(storage, `catalogos/${e.target.files[0].name}`)).then((url) => {
                setDataHombre({ ...dataHombre, imagen: url })
            });
        });
    }

    const handleGuardar = () => {
        if (dataHombre.nombre.trim() === '' || dataHombre.descripcion.trim() === '' || dataHombre.codProducto.trim() === '' || dataHombre.imagen.trim() === '' || dataHombre.precio.trim() === '' || dataHombre.tamanos.length === 0 || dataHombre.colores.length === 0) {
            console.log('Faltan datos');
            setOpen(true);
            setSeverity('error');
            setMensaje('Faltan datos');
        } else {
            setCargando(true);
            addDoc(collection(db, categoria), dataHombre)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    setOpen(true);
                    setSeverity('success');
                    setMensaje('Se guardó correctamente');
                    setCargando(false);
                    setDataHombre({
                        nombre: '',
                        descripcion: '',
                        descuento: '',
                        codProducto: '',
                        imagen: '',
                        precio: '',
                        tamanos: [],
                        colores: []
                    })
                    setTamanosArray([]);
                    setColoresArray([]);
                })
                .catch((error) => {
                    setCargando(false);
                    console.error("Error adding document: ", error);
                });
        }
    }

    const handleAddTamanos = () => {
        if (tamanos.trim() === '') {
            console.log('Faltan datos');
            return;
        } else {
            setTamanosArray([...tamanosArray, tamanos]);
            setTamanos('');
        }
    }

    const handleAddColores = () => {
        if (colores.trim() === '') {
            console.log('Faltan datos');
            return;
        } else {
            setColoresArray([...coloresArray, colores]);
            setColores('');
        }
    }

    const handleDeleteTamanos = (index) => {
        const array = tamanosArray.filter((item, indexs) => indexs !== index);
        setTamanosArray(array);
    }

    const handleDeleteColores = (index) => {
        const array = coloresArray.filter((item, indexs) => indexs !== index);
        setColoresArray(array);
    }

    console.log('tamanosArray', dataHombre);



    return (
        <Box style={{}}>

            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <Typography variant="body1" gutterBottom align="center" style={{ marginBottom: '1rem' }}>
                    Complete el formulario para agregar un nuevo catálogo
                </Typography>

                <Box style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            value={dataHombre.nombre}
                            onChange={(e) => setDataHombre({ ...dataHombre, nombre: e.target.value })}
                        />
                    </Box>

                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Descripcion"
                            variant="outlined"
                            value={dataHombre.descripcion}
                            onChange={(e) => setDataHombre({ ...dataHombre, descripcion: e.target.value })}
                        />
                    </Box>

                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Descuento"
                            variant="outlined"
                            value={dataHombre.descuento}
                            onChange={(e) => setDataHombre({ ...dataHombre, descuento: e.target.value })}
                        />
                    </Box>

                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Código de Producto"
                            variant="outlined"
                            value={dataHombre.codProducto}
                            onChange={(e) => setDataHombre({ ...dataHombre, codProducto: e.target.value })}
                        />
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <TextField
                            id="outlined-basic"
                            label="Precio"
                            variant="outlined"
                            value={dataHombre.precio}
                            onChange={(e) => setDataHombre({ ...dataHombre, precio: e.target.value })}
                        />
                    </Box>

                    <Box style={{ marginBottom: '1rem' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoria}
                                label="Categorías"
                                onChange={handleChange}
                            >
                                <MenuItem value={'hombres'}>Hombres</MenuItem>
                                <MenuItem value={'mujeres'}>Mujeres</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box style={{ marginBottom: '1rem' }}>
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <TextField
                                id="outlined-number"
                                variant="outlined"
                                label="Tamaños"
                                onChange={(e) => setTamanos(e.target.value)}
                                value={tamanos}
                                style={{
                                    textAlign: 'center',
                                    width: 100,
                                    marginRight: 10
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: 5,
                                    height: 50,
                                    width: 200,
                                    backgroundColor: '#028532'
                                }}
                                onClick={handleAddTamanos}
                            >
                                Agregar
                            </Button>
                        </Box>

                        {tamanosArray.length > 0 &&
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                {tamanosArray.map((item, index) => {
                                    return (
                                        <Box key={index} style={{
                                            backgroundColor: '#aaaaaa',
                                            padding: 10,
                                            borderRadius: 5,
                                            margin: 5
                                        }}>
                                            <Box style={{
                                                display: 'flex',
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',

                                            }}>
                                                <Typography variant="body1" gutterBottom align="center" style={{
                                                    color: '#fff',
                                                }}>
                                                    {item}
                                                </Typography>

                                                <IconButton
                                                    onClick={() => {
                                                        handleDeleteTamanos(index);
                                                    }}
                                                >
                                                    <Delete
                                                        style={{
                                                            color: '#fff'
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        }
                    </Box>

                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <TextField
                                id="outlined-number"
                                variant="outlined"
                                label="Colores"
                                onChange={(e) => setColores(e.target.value)}
                                value={colores}
                                style={{
                                    textAlign: 'center',
                                    width: 100,
                                    marginRight: 10
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    borderRadius: 5,
                                    height: 50,
                                    width: 200,
                                    backgroundColor: '#028532'
                                }}
                                onClick={handleAddColores}
                            >
                                Agregar
                            </Button>
                        </Box>

                        {coloresArray.length > 0 &&
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                {coloresArray.map((item, index) => {
                                    return (
                                        <Box key={index} style={{
                                            backgroundColor: '#aaaaaa',
                                            padding: 10,
                                            borderRadius: 5,
                                            margin: 5
                                        }}>
                                            <Box style={{
                                                display: 'flex',
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',

                                            }}>
                                                <Typography variant="body1" gutterBottom align="center" style={{
                                                    color: '#fff',
                                                }}>
                                                    {item}
                                                </Typography>

                                                <IconButton
                                                    onClick={() => {
                                                        handleDeleteColores(index);
                                                    }}
                                                >
                                                    <Delete
                                                        style={{
                                                            color: '#fff'
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        }

                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <input
                            type="file"
                            onChange={(e) => { handleUpload(e) }}
                        />

                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { handleGuardar() }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} elevation={6} variant="filled" >
                    {mensaje}
                </Alert>
            </Snackbar>


            <Backdrop className={classes.backdrop} open={cargando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>


    );
}

export default AddCatalogos;