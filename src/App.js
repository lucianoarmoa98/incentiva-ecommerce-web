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

  const dataLocalStorage = () => {
    let nameLocal = localStorage.getItem('dataUser');
    if (nameLocal) {
      dispatch(setToken(JSON.parse(nameLocal)));
    } else {
      return null;
    }
  }

  useEffect(() => {
    dataLocalStorage();
  }, [dataLocalStorage])
  return (
    <RutesScreen />
  )
}

export default App
