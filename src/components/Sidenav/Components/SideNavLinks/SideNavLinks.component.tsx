import { NavLink } from "react-router-dom";
import "./SideNavLinks.style.scss";
import { Icon } from "@mui/material";
import { useState } from "react";

interface Props {
  to?: string;
  icon?: JSX.Element;
  iconUp?: JSX.Element;
  iconDow?: JSX.Element;
  title?: string;
  subNav?: {
    title: string;
    path: string;
    icon: JSX.Element;
  }[];
  closeMenu: boolean;
}

const SideNavLinks = ({
  to,
  title,
  icon,
  iconUp,
  iconDow,
  subNav,
  closeMenu,
}: Props) => {
  const [subMenu, setSubMenu] = useState(false);
  const showSubMenu = () => setSubMenu(!subMenu);

  return (
    <>
      <li>
        <NavLink
          className={closeMenu === false ? "NavLinks" : "NavLinks active"}
          //strict="true"
          to={{
            pathname: to,
          }}
          onClick={showSubMenu}
        >
          <div className="icon">
            <Icon>{icon}</Icon>
          </div>
          {title}
          <div
            style={{ marginLeft: "25px", transition: "transform 0.04s ease" }}
          >
            {subMenu ? iconUp : iconDow}
          </div>
        </NavLink>
        {subMenu &&
          subNav?.map((item, i) => {
            return (
              <NavLink
                key={i}
                className={
                  closeMenu === false ? "SubNavLinks" : "SubNavLinks active"
                }
                to={{
                  pathname: item.path,
                }}
              >
                <div className="iconSub">
                  <Icon>{item.icon}</Icon>
                </div>
                {item.title}
              </NavLink>
            );
          })}
      </li>
    </>
  );
};
export default SideNavLinks;
