import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import { RutasPublicas } from "../models";

export const AuthGuard = () => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.token ? (
    <Outlet />
  ) : (
    <Navigate replace to={RutasPublicas.LOGIN} />
  );
};

export default AuthGuard;
