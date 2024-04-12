import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Footer.style.scss";
import { RutasPublicas } from "@/models";
import { AppStore } from "@/redux/store";
import { resetUser } from "@/redux/states/user";

interface Props {
  closeMenu: boolean;
}

const FooterComponent = ({ closeMenu }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logOut = () => {
    //clearLocalStorage(userKey);
    dispatch(resetUser());

    navigate(`${RutasPublicas.LOGIN}`, { replace: true });
  };

  return (
    <>
      <div
        className={
          closeMenu === false ? "footerwrapper" : "footerwrapper active"
        }
      >
        <ul className="Footer">
          <li onClick={logOut}>
            {userState.token ? (
              <a>
                <div className="icon">
                  <LogoutIcon />
                </div>
                LogOut
              </a>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterComponent;
