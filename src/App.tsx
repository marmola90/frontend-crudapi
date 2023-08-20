import { Navigate, Route } from "react-router-dom";
import "./App.css";
import { RutasPrivadas, RutasPublicas } from "./models";
import { AuthGuard } from "./guards";
import RoutesWithNotFound from "./utils/routeswithnotfound.utils";
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import { Navbar } from "./components/NavBar";

const Login = lazy(() => import("./Pages/Login/Login"));
const Private = lazy(() => import("./Pages/private/DireccionesPrivadas"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<CircularProgress />}>
        <Navbar />
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={RutasPrivadas.PRIVATE} />} />
          <Route path={RutasPublicas.LOGIN} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path={`${RutasPrivadas.PRIVATE}/*`} element={<Private />} />
          </Route>
          {/* <Route element={<RolGuard perfil={Roles.ADMIN} />}>
            <Route path={RutasPrivadas.MODULOS} element={<Modulos />} />
          </Route> */}
        </RoutesWithNotFound>
      </Suspense>
    </div>
  );
}

export default App;
