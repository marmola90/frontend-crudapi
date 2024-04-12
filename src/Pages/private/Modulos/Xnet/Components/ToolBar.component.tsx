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

const ToolBarComponent = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows, permisos } = props;
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClick = () => {
    if (permisos.includes(PermisosTypes.Insertar)) {
      const ID = rows[rows.length - 1].ID + 1;
      setRows((oldRows) => [
        {
          ID,
          TABLA: "",
          CODIGO: "",
          DESCRIPCION: "",
          VERSION: "",
          ACTIVO: "",
          LINK: "",
          SIGLAS: "",
          LoginPorInstitucion: false,
          Imagen: "",
          ReportaDatos: false,
          AccesoAInstituciones: false,
          DescripcionHTML: "",
          AccesoTipoInstitucion: "",
          IdOrdenCategoria: 0,
          isNew: true,
        },
        ...oldRows,
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [ID]: { mode: GridRowModes.Edit, fieldToFocus: "TABLA" },
      }));
    } else {
      setSnackbar({
        children: "Usuario no autorizado ",
        severity: "warning",
      });
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Registro
      </Button>
      {!!snackbar && (
        <SnackBarComponent snackbar={snackbar} onClose={handleCloseSnackbar} />
      )}
    </GridToolbarContainer>
  );
};
export default ToolBarComponent;
