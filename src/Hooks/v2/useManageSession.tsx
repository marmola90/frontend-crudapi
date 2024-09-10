import { RutasPublicas, Sessions } from "@/models";
import { resetUser } from "@/redux/states/v2/user";
import { persistSessionStorage } from "@/utils";
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
      persistSessionStorage('currentPage', window.location.pathname)
      dispatch(resetUser());
      navigate(`/${RutasPublicas.LOGIN}`, { replace: true });
     
    }
  };
  return { managesSession, navigate, dispatch };
};
export default useManageSession;
