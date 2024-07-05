import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowsProp,
} from "@mui/x-data-grid";
import { lazy, useState } from "react";
import { DataGridComponent } from "../..";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Grid } from "@mui/material";
import { SnackBarComponent, TabComponents } from "@/components";
import { IPerfil, Sessions } from "@/models";

import { ToolBarPerfilComponent } from ".";
import {
  deletePerfil,
  getAllPerfil,
  insertPerfil,
  updatePerfil,
} from "@/services";
import {
  AsignarModulosConfig,
  AsignarRolesConfig,
  OtorgarPermisosConfig,
} from "..";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

const initialPermisosState: GridRowsProp = [
  {
    IDPerfil: 0,
    Descripcion: "",
  },
];

const PerfilConfig = () => {
  const { managesSession } = useManageSession();
  const {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    cargarDatos: cargarPerfil,
    setSnackbar,
    snackbar,
    openBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleRowModesModelChange,
  } = useLoadData(initialPermisosState, getAllPerfil);

  const [available, setAvailable] = useState(false);
  const [perfil, setPerfil] = useState(0);

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteDatos(id);
    setRows(rows.filter((row) => row.IDPerfil !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.IDPerfil === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.IDPerfil !== id));
    }
  };

  const deleteDatos = async (IDPerfil: GridRowId) => {
    await deletePerfil(IDPerfil as number)
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

  const insertDatos = async (perfil: GridRowModel) => {
    await insertPerfil(perfil as IPerfil)
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
          cargarPerfil();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const updateDatos = async (perfil: GridRowModel) => {
    await updatePerfil(perfil as IPerfil)
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
          cargarPerfil();
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
      rows.map((row) => (row.IDPerfil === newRow.IDPerfil ? updatedRow : row))
    );

    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      field: "Descripcion",
      headerName: "Descripcion",
      minWidth: 500,
      flex: 1,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      minWidth: 100,
      flex: 0.1,
      align: "center",
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
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
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

  const elements = [
    {
      elemento: (
        <AsignarModulosConfig perfilId={perfil} available={available} />
      ),
      label: "Modulos",
      id: 0,
    },
    {
      elemento: <AsignarRolesConfig perfilId={perfil} available={available} />,
      label: "Usuarios",
      id: 1,
    },
    {
      elemento: (
        <OtorgarPermisosConfig perfilId={perfil} available={available} />
      ),
      label: "Permisos",
      id: 2,
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
        <TextTitleComponent variante="h3" color="#353535de" titleName="Roles" />
        <Grid
          container
          columns={12}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid
            item
            // md={10.2}
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
            <Box sx={{ height: 550 }}>
              <DataGridComponent
                rows={rows}
                columns={columns}
                editMode="row"
                getRowId={(row: GridRowModel) => row.IDPerfil}
                sx={{ boxShadow: 5, borderRadius: "25px" }}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{
                  toolbar: ToolBarPerfilComponent,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel, rows },
                }}
                loading={openBackdrop}
                onRowClick={(paramas) => {
                  setAvailable(true);
                  setPerfil(paramas.row.IDPerfil);
                  console.log(paramas.row);
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
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          borderRadius: "25px",
          paddingBottom: "16px",
          alignItems: "center",
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      >
        <TextTitleComponent
          variante="h3"
          color="#353535de"
          titleName="Asignar Modulos/Permisos"
        />
        <Grid
          container
          columns={16}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TabComponents elements={elements} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PerfilConfig;
