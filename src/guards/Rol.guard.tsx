import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { Roles, RutasPrivadas } from "@/models";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  perfil: Roles;
}

const RoleGuard = ({ perfil }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  console.log(userState.datos.IDPerfil);
  return userState.datos.IDPerfil === perfil ? (
    <Outlet />
  ) : (
    <Navigate replace to={RutasPrivadas.PRIVATE} />
  );
};

export default RoleGuard;
