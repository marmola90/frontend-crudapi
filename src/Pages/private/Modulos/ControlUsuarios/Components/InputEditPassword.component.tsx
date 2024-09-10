import {
  AlertProps,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";

import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { SnackBarComponent } from "@/components";
import PasswordIcon from "@mui/icons-material/Password";
import { generarPass } from "@/utils";
import { Roles } from "@/models";
import { AppStore } from "@/redux/store/v2/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { postDecryptPass } from "@/services/v2";

const InputEditPassword = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const userState = useSelector((store: AppStore) => store.user);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const apiRef = useGridApiContext();

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    const Id: number = id as number;
    postDecryptPass(Id)
      .then((res) => res.json())
      .then((pass) => {
        if (pass.status === "Error") {
          setSnackbar({
            children: pass.data.ErrorDetail,
            severity: "error",
          });
        } else {
          apiRef.current.setEditCellValue({
            id,
            field,
            value: pass.data?.Pwd,
          });
        }
      });
  }, [apiRef, field, id]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    (userState.datos.IDPerfil === Roles.ADMINAPP ||
      userState.datos.IDPerfil === Roles.CONSULADMON) &&
      apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
  };

  const handleGeneratePass = async () => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: generarPass(),
    });
  };

  return (
    <>
      <TextField
        key={id}
        type={"text"}
        value={value}
        onChange={handleChange}
        fullWidth
        InputProps={{
          endAdornment: (userState.datos.IDPerfil === Roles.ADMINAPP ||
            userState.datos.IDPerfil === Roles.CONSULADMON) && (
            <Tooltip title="Generar Password">
              <InputAdornment position="end">
                <IconButton
                  aria-label="Generar Password"
                  onClick={handleGeneratePass}
                >
                  <PasswordIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            </Tooltip>
          ),
        }}
      />
      {!!snackbar && (
        <SnackBarComponent snackbar={snackbar} onClose={handleCloseSnackbar} />
      )}
    </>
  );
};

export default InputEditPassword;
