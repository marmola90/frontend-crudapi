import { Roles, RutasPrivadas } from "@/models";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExtensionIcon from "@mui/icons-material/Extension";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
//import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
//import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SupportIcon from "@mui/icons-material/Support";
import "./Sidenav.style.scss";

import { SideNavLinks } from "./Components/SideNavLinks";
import { FooterComponent, LogoComponent } from ".";
import { AppStore } from "@/redux/store";
import { useSelector } from "react-redux";
interface Props {
  closeMenu: boolean;
  setCloseMenu: React.Dispatch<boolean>;
}

const SideNav = ({ closeMenu, setCloseMenu }: Props) => {
  const handleClose = () => setCloseMenu(!closeMenu);

  const userState = useSelector((store: AppStore) => store.user);

  const navButtonsFunction = (rol: Roles) => {
    switch (rol) {
      case Roles.ADMINAPP:
        return [
          {
            to: RutasPrivadas.HOME,
            icon: <DashboardOutlinedIcon />,
            title: "Dashboard",
          },
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Xnet",
                path: `${RutasPrivadas.MODULOS}/Xnet`,
                icon: <WebAssetOutlinedIcon />,
              },
              {
                title: "Control Usuarios",
                path: `${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`,
                icon: <ExtensionIcon />,
              },
              {
                title: "BOX",
                path: `${RutasPrivadas.MODULOS}/Box`,
                icon: <MarkunreadMailboxIcon />,
              },
            ],
          },
          {
            icon: <SettingsOutlinedIcon />,
            title: "Configuración",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Modulos",
                path: `${RutasPrivadas.CONFIG}/${RutasPrivadas.MODULOS}`,
                icon: <SupportIcon fontSize="small" />,
              },
              {
                title: "Roles",
                path: `${RutasPrivadas.CONFIG}/${RutasPrivadas.PERFIL}`,
                icon: <BadgeOutlinedIcon fontSize="small" />,
              },
              {
                title: "Usuarios",
                path: `${RutasPrivadas.CONFIG}/${RutasPrivadas.USER}`,
                icon: <ManageAccountsOutlinedIcon fontSize="small" />,
              },
            ],
          },
        ];
      case Roles.ADMINMODULOS:
        return [
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Xnet",
                path: `${RutasPrivadas.MODULOS}/Xnet`,
                icon: <WebAssetOutlinedIcon />,
              },
            ],
          },
        ];
      case Roles.EDITORAPP:
        return [
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Xnet",
                path: `${RutasPrivadas.MODULOS}/Xnet`,
                icon: <WebAssetOutlinedIcon />,
              },
              {
                title: "Control Usuarios",
                path: `${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`,
                icon: <ExtensionIcon />,
              },
            ],
          },
        ];
      case Roles.CONSULADMON:
      case Roles.CONSULSUPUSR:
        return [
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Control Usuarios",
                path: `${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`,
                icon: <ExtensionIcon />,
              },
              {
                title: "BOX",
                path: `${RutasPrivadas.MODULOS}/Box`,
                icon: <MarkunreadMailboxIcon />,
              },
            ],
          },
        ];
      case Roles.CONSULSOPORTE:
        return [
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "Control Usuarios",
                path: `${RutasPrivadas.MODULOS}/${RutasPrivadas.CONTROLUSUARIOS}`,
                icon: <ExtensionIcon />,
              },
            ],
          },
        ];
      case Roles.CONSULCNBSBOX:
        return [
          {
            icon: <AutoAwesomeMotionOutlinedIcon />,
            title: "Módulos",
            iconArrowUp: <ArrowDropUpOutlinedIcon />,
            iconArrowDown: <ArrowDropDownOutlinedIcon />,
            subNav: [
              {
                title: "BOX",
                path: `${RutasPrivadas.MODULOS}/Box`,
                icon: <MarkunreadMailboxIcon />,
              },
            ],
          },
        ];

      default:
        return [];
    }
  };
  const navButtons = navButtonsFunction(userState.datos.IDPerfil);

  return (
    <>
      <nav>
        <div
          className={
            closeMenu === false ? "SideBarWrapper" : "SideBarWrapper active"
          }
        >
          <div
            className={
              closeMenu === false ? "SideBarBody" : "SideBarBody active"
            }
          >
            <LogoComponent closeMenu={closeMenu} />
            <div
              className={
                closeMenu === false
                  ? "burgerContainer"
                  : "burgerContainer active"
              }
            >
              <div
                className="burgerTrigger"
                onClick={() => handleClose()}
              ></div>
              <div className="burgerMenu" onClick={() => handleClose()}></div>
            </div>
            <ul
              className={closeMenu === false ? "UnderList" : "UnderList active"}
            >
              {navButtons.map((item, i) => {
                return (
                  <SideNavLinks
                    key={i}
                    to={item.to}
                    icon={item.icon}
                    title={item.title}
                    iconUp={item.iconArrowUp}
                    iconDow={item.iconArrowDown}
                    subNav={item.subNav}
                    closeMenu={closeMenu}
                  />
                );
              })}
            </ul>
            <FooterComponent closeMenu={closeMenu} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
