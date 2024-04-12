import { AlertProps, Select, SelectChangeEvent } from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IPerfil } from "@/models";
import { getAllPerfil } from "@/services";
import { SnackBarComponent } from "@/components";
import MenuItem from "@mui/material/MenuItem";

const SelectEditPerfilComponent = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const [perfil, setPerfil] = useState<IPerfil[]>([]);
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

  useEffect(() => {
    getAllPerfil()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          console.log(datos);
          setPerfil(datos.data);
        }
      });
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
        {perfil.map((item) => {
          return (
            <MenuItem value={item.IDPerfil} key={item.IDPerfil}>
              {item.Descripcion}
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
export default SelectEditPerfilComponent;
