import { useState } from "react";
import RoutesWithNotFound from "@/utils/routeswithnotfound.utils";
import { SideNav } from "@/components";
import "./DireccionesPrivadas.style.scss";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { RutasRoles } from "@/utils/RutasRoles.utils";

const DireccionesPrivadas = () => {
  const [closeMenu, setCloseMenu] = useState(false);
  const userState = useSelector((store: AppStore) => store.user);

  return (
    <>
      <SideNav closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
      <div className={closeMenu === false ? "Container" : "Container active"}>
        <RoutesWithNotFound>
          {RutasRoles(userState.datos.IDPerfil)}
        </RoutesWithNotFound>
      </div>
    </>
  );
};
export default DireccionesPrivadas;
