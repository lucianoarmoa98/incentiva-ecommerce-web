import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

//--------------------------------validacion de si esta logueado, se usa para login y las rutas
export const dataLocalStorage = () => {
    let nameLocal = localStorage.getItem('dataUser');
    if (nameLocal) {
        return JSON.parse(nameLocal);
    } else {
        return null;
    }
}

export const ProtectedRoutes = () => {
    const stateToken = useSelector(state => state.reducerGlobal.token);

    return stateToken ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};



//-------------------------------------validacion de login y redireccion
export const ProtectedRoutesLogin = () => {
    const stateToken = useSelector(state => state.reducerGlobal.token);

    return stateToken ? (
        <Navigate to="/home" replace />
    ) : (
        <Outlet />
    );
};