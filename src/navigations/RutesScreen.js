import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoutes, ProtectedRoutesLogin } from "./Autorizador"
import LoginScreen from "../page/login/LoginScreen"
import ErrorPage from "../page/errorPage/ErrorPage"
import DashboardHome from "../page/dashboardHome/DashboardHome"
import DashboardHombres from "../page/dashboardHome/DashboarHombres"
import DashboardMujeres from "../page/dashboardHome/DashboarMujeres"
import InicioPage from "../page/inicio/InicioPage"


function RutesScreen() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<ProtectedRoutesLogin />} >
          <Route path="/" element={<LoginScreen />} />
        </Route> */}

        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/incentiva-ecommerce-web" element={<InicioPage />} />
          <Route path="/incentiva-ecommerce-web/inicio" element={<DashboardHome />} />
          <Route path="/incentiva-ecommerce-web/hombres" element={<DashboardHombres />} />
          <Route path="/incentiva-ecommerce-web/mujeres" element={<DashboardMujeres />} />
          <Route path="*" element={<ErrorPage />} />
        {/* </Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default RutesScreen
