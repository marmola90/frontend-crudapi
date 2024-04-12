import AddIcon from "@mui/icons-material/Add";
import { AlertProps, Button } from "@mui/material";
import {
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useState } from "react";
import { SnackBarComponent } from "@/components";
import { PermisosTypes } from "@/models";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  rows: GridRowModel;
  permisos: number[];
}

const ToolBarControlUsuarios = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows, permisos } = props;
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = () => {
    if (permisos.includes(PermisosTypes.Insertar)) {
      const Id = rows[rows.length - 1].Id + 1;
      console.log(Id);
      setRows((oldRows) => [
        {
          Id,
          Usuario: "",
          Gestor: "",
          Aplicacion: "",
          PwdEncryted: "",
          DireccionApp: "",
          FechaModificacion: new Date().toLocaleString("en-EN", {
            timeZone: "UTC",
          }),
          Appx: false,
          isEnable: true,
          isNew: true,
        },
        ...oldRows,
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [Id]: { mode: GridRowModes.Edit, fieldToFocus: "Usuario" },
      }));
    } else {
      setSnackbar({
        children: "Usuario no autorizado ",
        severity: "warning",
      });
    }
  };

  return (
    <>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Agregar Registro
        </Button>
        {!!snackbar && (
          <SnackBarComponent
            snackbar={snackbar}
            onClose={handleCloseSnackbar}
          />
        )}
      </GridToolbarContainer>
    </>
  );
};

export default ToolBarControlUsuarios;
