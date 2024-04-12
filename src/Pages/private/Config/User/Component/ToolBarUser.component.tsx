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

const ToolBarUserComponent = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    console.log(rows);
    const Id = rows[rows.length - 1].Id + 1;
    console.log(Id);
    setRows((oldRows) => [
      ...oldRows,
      {
        Id,
        Usuario: "",
        EstaActivo: 0,
        IDPerfil: 0,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [Id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "Usuario",
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
export default ToolBarUserComponent;
