import { Navigate, Route } from "react-router-dom";
import { Roles, RutasPrivadas } from "../../models";
import { lazy } from "react";
import RoutesWithNotFound from "../../utils/routeswithnotfound.utils";
import { Xnet } from ".";
import { RolGuard } from "../../guards";

const Modulos = lazy(() => import("./Modulos/Modulos"));
const DireccionesPrivadas = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={RutasPrivadas.MODULOS} />} />
      <Route element={<RolGuard perfil={Roles.ADMIN} />}>
        <Route path={RutasPrivadas.MODULOS} element={<Modulos />} />
        <Route
          path={`${RutasPrivadas.MODULOS}/${RutasPrivadas.XNET}`}
          element={<Xnet />}
        />
      </Route>
    </RoutesWithNotFound>
  );
};
export default DireccionesPrivadas;
