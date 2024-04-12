import { RutasPublicas, Sessions } from "@/models";
import { resetUser } from "@/redux/states/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/*interface manageSessionProps {
  session: Sessions;
}*/

const useManageSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const managesSession = (status: Sessions) => {
    if (status === Sessions.SESSION_NO_VALIDA) {
      navigate(`/${RutasPublicas.LOGIN}`, { replace: true });
      dispatch(resetUser());
    }
  };
  return { managesSession, navigate, dispatch };
};
export default useManageSession;
