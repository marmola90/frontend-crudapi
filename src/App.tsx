import { Navigate, Route } from "react-router-dom";
import "./App.css";
import { RutasPrivadas, RutasPublicas } from "./models/index.ts";
import { AuthGuard } from "./guards/index.ts";
import RoutesWithNotFound from "./utils/routeswithnotfound.utils.tsx";
import { Suspense, lazy } from "react";
import { Box, CircularProgress } from "@mui/material";
//import { Navbar } from "./components/NavBar/index.ts";

//const Login = lazy(() => import("./Pages/Login/Login.tsx"));
const Login = lazy(() => import("./Pages/Login/v2/Login.tsx"));
const Private = lazy(() => import("./Pages/private/DireccionesPrivadas.tsx"));

function App() {
  return (
    <div className="App">
      <>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                marginLeft: 120,
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <RoutesWithNotFound>
            <Route path="/" element={<Navigate to={RutasPrivadas.PRIVATE} />} />
            <Route path={RutasPublicas.LOGIN} element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route
                path={`${RutasPrivadas.PRIVATE}/*`}
                element={<Private />}
              />
            </Route>
          </RoutesWithNotFound>
        </Suspense>
      </>
    </div>
  );
}

export default App;
