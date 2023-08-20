import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  DataGridProps,
} from "@mui/x-data-grid";
import { TablasVersion } from "../../../../../models";

interface Props extends DataGridProps {
  rows: GridRowsProp | TablasVersion[];
  columns: GridColDef[];
  // getRowId: GridRowIdGetter;
}

const DataGridComponent = ({
  rows,
  columns,
  // getRowId,
  ...otherProps
}: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      //getRowId={getRowId}
      {...otherProps}
    />
  );
};
export default DataGridComponent;
