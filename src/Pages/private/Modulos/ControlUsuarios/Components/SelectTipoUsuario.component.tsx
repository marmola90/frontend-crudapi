import { AlertProps, Select, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { SnackBarComponent } from "@/components";
import MenuItem from "@mui/material/MenuItem";
import { getTipoUsuarioUrl } from "@/services/userEncrypt.service";
import { ITipoUsuario } from "@/models";

const SelectTipoUsuario = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  console.log(props);
  const [tipoUsuario, setTipoUsuario] = useState<ITipoUsuario[]>([]);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    //apiRef.current.stopCellEditMode({ id, field });
  };

  const handleCloseSnackbar = () => setSnackbar(null);
  const cargarTipoUsuario = () => {
    getTipoUsuarioUrl()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setTipoUsuario(datos.data);
        }
      });
  };
  useEffect(() => {
    cargarTipoUsuario();
  }, []);

  return (
    <>
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        autoFocus
        fullWidth
      >
        {tipoUsuario.map((item) => {
          return (
            <MenuItem value={item.TipoUsuario} key={item.IdTipo}>
              {item.TipoUsuario}
            </MenuItem>
          );
        })}
      </Select>
      {!!snackbar && (
        <SnackBarComponent snackbar={snackbar} onClose={handleCloseSnackbar} />
      )}
    </>
  );
};
export default SelectTipoUsuario;
