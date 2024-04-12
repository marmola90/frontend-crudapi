import {
  GridActionsCellItem,
  GridColDef,
  // GridEventListener,
  //GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  //GridRowModesModel,
  GridRowsProp,
} from "@mui/x-data-grid";
//import { lazy, useCallback, useEffect, useState } from "react";
import { lazy } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
//import { AlertProps, Box, Grid } from "@mui/material";
import { Box, Grid } from "@mui/material";
import {
  deleteModulo,
  getAllModulos,
  insertModulo,
  updateModulo,
} from "@/services/modulos.service";
import { IModulos, Sessions } from "@/models";
import DataGridComponent from "../../Modulos/component/DataGrid/DataGrid.component";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
//import { ToolBarModuleComponent } from "./Component";
//import { SnackBarComponent } from "@/components";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);
const ToolBarModuleComponent = lazy(
  () => import("./Component/ToolBarModule.component")
);
const SnackBarComponent = lazy(
  () => import("@/components/SnackBar/SnackBar.component")
);

const initialModuleState: GridRowsProp = [
  {
    IdModulo: 0,
    Descripcion: "",
    BDAsociada: [],
  },
];

const ModulosConfig = () => {
  const {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    cargarDatos: cargarModulos,
    setSnackbar,
    snackbar,
    openBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleRowModesModelChange,
  } = useLoadData(initialModuleState, getAllModulos);
  const { managesSession } = useManageSession();

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteDatos(id);
    setRows(rows.filter((row) => row.IdModulo !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.IdModulo === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.IdModulo !== id));
    }
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
      rows.map((row) => (row.IdModulo === newRow.IdModulo ? updatedRow : row))
    );

    return updatedRow;
  };

  const deleteDatos = async (IdModulo: GridRowId) => {
    await deleteModulo(IdModulo as number)
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
            children: "successfully removed",
            severity: "success",
          });
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const insertDatos = async (modulo: GridRowModel) => {
    await insertModulo(modulo as IModulos)
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
          cargarModulos();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const updateDatos = async (modulo: GridRowModel) => {
    await updateModulo(modulo as IModulos)
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
          cargarModulos();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const columns: GridColDef[] = [
    {
      field: "Descripcion",
      headerName: "Descripcion",
      minWidth: 250,
      flex: 1,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "BDAsociada",
      headerName: "BD Asociada",
      minWidth: 300,
      headerClassName: "headerGrid",
      editable: true,
      type: "singleSelect",
      valueOptions: ["XNET", "XNET_BANCOS", "CNBS Box", "NO APLICA"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      minWidth: 80,
      flex: 0.3,
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
                color: "#3A833A",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              //className="textPrimary"
              onClick={handleCancelClick(id)}
              sx={{ color: "darkred" }}
              // color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "#1d8df8" }} />}
            label="Edit"
            //className="textPrimary"
            onClick={handleEditClick(id)}
            // color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      //direction="column"
      sx={{ marginLeft: "1rem" }}
      alignItems={"flex-start"}
      justifyContent={"space-around"}
    >
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          borderRadius: "25px",
          paddingBottom: "16px",
          alignItems: "center",
          paddingRight: "16px",
        }}
      >
        <TextTitleComponent
          variante="h3"
          color="#353535de"
          titleName="Módulos"
        />
        <Grid
          container
          spacing={1}
          rowSpacing={8}
          direction="column"
          //sx={{ width: "38.6em" }}
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
            <Box sx={{ height: 400 }}>
              <DataGridComponent
                rows={rows}
                columns={columns}
                editMode="row"
                getRowId={(row: GridRowModel) => row.IdModulo}
                sx={{ boxShadow: 5, borderRadius: "25px" }}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{
                  toolbar: ToolBarModuleComponent,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel, rows },
                }}
                loading={openBackdrop}
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
      </Grid>
    </Grid>
  );
};
export default ModulosConfig;
