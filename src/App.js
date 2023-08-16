import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoutes, ProtectedRoutesLogin } from "./navigations/Autorizador"
import LoginScreen from "./page/login/LoginScreen"
import ErrorPage from "./page/errorPage/ErrorPage"
import RutesScreen from "./navigations/RutesScreen"
import { useDispatch } from "react-redux"
import { setToken } from "./redux/actions/action"

function App() {
  const dispatch = useDispatch();


  return (
    <RutesScreen />
  )
}

export default App
