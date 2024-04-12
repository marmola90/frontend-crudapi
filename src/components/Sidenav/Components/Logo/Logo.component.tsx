import { Link } from "react-router-dom";
import { RutasPrivadas } from "@/models";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import "./Logo.style.scss";

interface Props {
  closeMenu: boolean;
}
const LogoComponent = ({ closeMenu }: Props) => {
  return (
    <>
      <div
        className={closeMenu === false ? "logowrapper" : "logowrapper active"}
      >
        <Link to={RutasPrivadas.HOME}>
          <div>
            <BallotOutlinedIcon />
          </div>
          <h4>Modulos CRUD</h4>
        </Link>
      </div>
    </>
  );
};

export default LogoComponent;
