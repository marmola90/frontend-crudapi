import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import {
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  rows: GridRowModel;
}

const ToolBarPermisosComponent = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    console.log(rows);
    console.log(rows.length);
    const IDPermisos = rows[rows.length - 1].IDPermisos + 1;
    console.log(IDPermisos);
    setRows((oldRows) => [
      ...oldRows,
      {
        IDPermisos,
        Descripcion: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [IDPermisos]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "Descripcion",
      },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Registro
      </Button>
    </GridToolbarContainer>
  );
};
export default ToolBarPermisosComponent;
