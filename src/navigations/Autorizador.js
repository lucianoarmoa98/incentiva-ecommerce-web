import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



export const ProtectedRoutes = () => {
    const stateToken = useSelector(state => state.reducerGlobal.token);
    let nameLocal = localStorage.getItem('dataUser');
    console.log(stateToken);

    return nameLocal ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
};



//-------------------------------------validacion de login y redireccion
export const ProtectedRoutesLogin = () => {
    const stateToken = useSelector(state => state.reducerGlobal.token);

    return stateToken ? (
        <Navigate to="/incentiva-ecommerce-web/admin" replace />
    ) : (
        <Outlet />
    );
};