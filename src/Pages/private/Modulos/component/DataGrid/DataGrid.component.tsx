import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  DataGridProps,
} from "@mui/x-data-grid";
import { TablasVersion } from "@/models";
//import { memo } from "react";

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

//const DataGridComponent = memo(DataGrids);

export default DataGridComponent;
