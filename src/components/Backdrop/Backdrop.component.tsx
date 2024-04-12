import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  openBackdrop: boolean;
  setOpenBackdrop: React.Dispatch<boolean>;
}
const BackdropComp = ({ openBackdrop, setOpenBackdrop }: Props) => {
  const handleClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default BackdropComp;
