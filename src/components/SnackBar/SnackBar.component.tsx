import { Alert, AlertProps, Snackbar } from "@mui/material";

interface Props {
  snackbar: AlertProps;
  onClose:
    | ((event: Event | React.SyntheticEvent<Element, Event>) => void)
    | undefined;
}
const SnackBarComponent = ({ snackbar, onClose }: Props) => {
  return (
    <>
      <Snackbar
        open
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={onClose}
        autoHideDuration={6000}
      >
        <Alert {...snackbar} onClose={onClose} />
      </Snackbar>
    </>
  );
};
export default SnackBarComponent;
