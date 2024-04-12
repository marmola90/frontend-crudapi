import RolGuard from "@/guards/Rol.guard";
import { Roles } from "@/models/roles";
import { RutasPrivadas } from "@/models/routes";
import { Navigate, Route } from "react-router-dom";
import {
  MantenimientoComponent,
  PerfilConfig,
  UserConfig,
} from "../Pages/private/Config";
import { lazy } from "react";
import { LogEventos } from "@/Pages/private/Modulos/CNBSBox";

const Modulos = lazy(() => import("../Pages/private/Modulos/Modulos"));
const Xnet = lazy(() => import("../Pages/private/Modulos/Xnet/Xnet"));
const ControlUsuarios = lazy(
  () =>
    import("../Pages/private/Modulos/ControlUsuarios/ControlUsuarios.component")
);
const ModulosConfig = lazy(
  () => import("../Pages/private/Config/Modulos/Modulos.component")
);
const HomeComponent = lazy(
  () => import("../Pages/private/Page/Home/Home.component")
);

export const RutasRoles = (rol: number): JSX.Element => {
  switch (rol) {
    case Roles.ADMINAPP:
      return (
        <>
          <Route element={<RolGuard perfil={Roles.ADMINAPP} />}>
            <Route path="/" element={<Navigate to={RutasPrivadas.HOME} />} />
            <Route path={RutasPrivadas.HOME} element={<HomeComponent />} />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod`}
              element={<Modulos />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.XNETABLAS}`}
              element={<Xnet />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
              element={<ControlUsuarios />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.LOGEVENTOS}`}
              element={<LogEventos />}
            />
            <Route path={RutasPrivadas.CONFIG}>
              <Route
                path={RutasPrivadas.MANTENIMIENTO}
                element={<MantenimientoComponent />}
              />
              <Route path={RutasPrivadas.PERFIL} element={<PerfilConfig />} />
              <Route path={RutasPrivadas.USER} element={<UserConfig />} />
              <Route path={RutasPrivadas.MODULOS} element={<ModulosConfig />} />
            </Route>
          </Route>
        </>
      );

    case Roles.ADMINMODULOS:
      return (
        <>
          <Route element={<RolGuard perfil={Roles.ADMINMODULOS} />}>
            <Route
              path="/"
              element={<Navigate to={`${RutasPrivadas.MODULOS}/Xnet`} />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod`}
              element={<Modulos />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.XNETABLAS}`}
              element={<Xnet />}
            />
          </Route>
        </>
      );
    case Roles.EDITORAPP:
      return (
        <>
          <Route element={<RolGuard perfil={Roles.EDITORAPP} />}>
            <Route path="/" element={<Navigate to={RutasPrivadas.HOME} />} />
            <Route path={RutasPrivadas.HOME} element={<HomeComponent />} />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod`}
              element={<Modulos />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.XNETABLAS}`}
              element={<Xnet />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
              element={<ControlUsuarios />}
            />
          </Route>
        </>
      );
    case Roles.CONSULCNBSBOX:
      return (
        <>
          <Route element={<RolGuard perfil={Roles.CONSULCNBSBOX} />}>
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod`}
              element={<Modulos />}
            />
            <Route
              path="/"
              element={
                <Navigate
                  to={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.LOGEVENTOS}`}
                />
              }
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.LOGEVENTOS}`}
              element={<LogEventos />}
            />
          </Route>
        </>
      );
    case Roles.CONSULSUPUSR:
    case Roles.CONSULADMON:
      return (
        <>
          <Route element={<RolGuard perfil={rol} />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
                />
              }
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
              element={<ControlUsuarios />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod`}
              element={<Modulos />}
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/:Mod/${RutasPrivadas.LOGEVENTOS}`}
              element={<LogEventos />}
            />
          </Route>
        </>
      );

    case Roles.CONSULSOPORTE:
      return (
        <>
          <Route element={<RolGuard perfil={Roles.CONSULSOPORTE} />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
                />
              }
            />
            <Route
              path={`${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`}
              element={<ControlUsuarios />}
            />
          </Route>
        </>
      );
    default:
      return (
        <>
          <Route path="/" element={<Navigate to={RutasPrivadas.PRIVATE} />} />
        </>
      );
  }
};
