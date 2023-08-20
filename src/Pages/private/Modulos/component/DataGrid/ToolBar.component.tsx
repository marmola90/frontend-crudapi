import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import {
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
}

const ToolBarComponent = (props: EditToolbarProps) => {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setRows((oldRows) => [
      {
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
      [""]: { mode: GridRowModes.Edit, fieldToFocus: "TABLA" },
      ...oldModel,
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
};
export default ToolBarComponent;
