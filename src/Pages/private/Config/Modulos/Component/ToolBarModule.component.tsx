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

const ToolBarModuleComponent = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel, rows } = props;

  const handleClick = () => {
    const IdModulo = rows[rows.length - 1].IdModulo + 1;
    console.log(IdModulo);
    setRows((oldRows) => [
      ...oldRows,
      {
        IdModulo,
        Descripcion: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [IdModulo]: {
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
export default ToolBarModuleComponent;
