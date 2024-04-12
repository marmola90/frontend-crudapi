import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowsProp,
} from "@mui/x-data-grid";
import { lazy } from "react";
import { DataGridComponent } from "../..";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid } from "@mui/material";
import { IPermisos, Sessions } from "@/models";
import { BackdropComp, SnackBarComponent } from "@/components";
import { ToolBarPermisosComponent } from "./Component";
import { getAllPermisos, insertPermiso, updatePermiso } from "@/services";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);
const initialPermisosState: GridRowsProp = [
  {
    IDPermisos: 0,
    Descripcion: "",
  },
];

const PermisosConfig = () => {
  const { managesSession } = useManageSession();
  const {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    cargarDatos: cargarPermisos,
    setSnackbar,
    snackbar,
    openBackdrop,
    setOpenBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleRowModesModelChange,
  } = useLoadData(initialPermisosState, getAllPermisos);

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.IDPermisos === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.IDPermisos !== id));
    }
  };

  const insertDatos = async (permiso: GridRowModel) => {
    await insertPermiso(permiso as IPermisos)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Error") {
          setSnackbar({
            children: data.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setSnackbar({
            children: "successfully saved",
            severity: "success",
          });
          cargarPermisos();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const updateDatos = async (permiso: GridRowModel) => {
    await updatePermiso(permiso as IPermisos)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Error") {
          setSnackbar({
            children: data.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setSnackbar({
            children: "successfully saved",
            severity: "success",
          });
          cargarPermisos();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    if (newRow.isNew) {
      insertDatos(newRow);
    } else {
      updateDatos(newRow);
    }

    console.log(updatedRow);
    setRows(
      rows.map((row) =>
        row.IDPermisos === newRow.IDPermisos ? updatedRow : row
      )
    );
    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      field: "Descripcion",
      headerName: "Descripcion",
      width: 350,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      width: 100,
      cellClassName: "actions",
      headerClassName: "headerGrid",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (openBackdrop) {
    return (
      <BackdropComp
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
      />
    );
  } else {
    return (
      <Grid
        container
        spacing={2}
        rowSpacing={8}
        direction="column"
        sx={{ width: "29.3em" }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            "& .headerGrid": {
              backgroundColor: "rgb(14 14 14 / 87%)",
              color: "white",
            },
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            "& .css-1j7qk7u": {
              color: "#fafafa",
            },
            "& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root": {
              color: "rgb(245 245 245 / 54%)",
            },
          }}
        >
          <TextTitleComponent
            variante="h3"
            color="#353535de"
            titleName="Permisos"
          />
          <Box sx={{ height: 600 }}>
            <DataGridComponent
              rows={rows}
              columns={columns}
              editMode="row"
              getRowId={(row: GridRowModel) => row.IDPermisos}
              sx={{ boxShadow: 5 }}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              slots={{
                toolbar: ToolBarPermisosComponent,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel, rows },
              }}
            />
            {!!snackbar && (
              <SnackBarComponent
                snackbar={snackbar}
                onClose={handleCloseSnackbar}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    );
  }
};
export default PermisosConfig;
