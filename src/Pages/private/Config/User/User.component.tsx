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
import { IUser, Sessions } from "@/models";
//import { SelectEditPerfilComponent, ToolBarUserComponent } from ".";
import {
  deleteUser,
  getAllUsersRoles,
  insertUser,
  updateUser,
} from "@/services";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
//import { AsignarModulosConfig } from "..";
const SelectEditPerfilComponent = lazy(
  () =>
    import("@/Pages/private/Config/User/Component/SelectEditPerfil.component")
);
const ToolBarUserComponent = lazy(
  () => import("@/Pages/private/Config/User/Component/ToolBarUser.component")
);
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);
const AsignarModulosConfig = lazy(
  () => import("@/Pages/private/Config/AsignarModulos/AsignarModulos.component")
);

const initialUsersState: GridRowsProp = [
  {
    Id: 0,
    Usuario: "",
    EstaActivo: 0,
    IDPerfil: 0,
  },
];

const UserConfig = () => {
  const { managesSession } = useManageSession();
  const {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    cargarDatos: cargarUsers,
    setSnackbar,
    snackbar,
    openBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleRowModesModelChange,
  } = useLoadData(initialUsersState, getAllUsersRoles);
  const [available, setAvailable] = useState(false);
  const [perfil, setPerfil] = useState(0);

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteDatos(id);
    setRows(rows.filter((row) => row.Id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.Id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.Id !== id));
    }
  };

  const deleteDatos = async (ID: GridRowId) => {
    await deleteUser(ID as number)
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

  const insertDatos = async (user: GridRowModel) => {
    await insertUser(user as IUser)
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
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const updateDatos = async (user: GridRowModel) => {
    await updateUser(user as IUser)
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
    console.log(newRow);
    if (newRow.isNew) {
      insertDatos(newRow);
    } else {
      updateDatos(newRow);
    }
    setRows(rows.map((row) => (row.Id === newRow.Id ? updatedRow : row)));

    cargarUsers();
    return updatedRow;
  };

  const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
    return <SelectEditPerfilComponent {...params} />;
  };

  const columns: GridColDef[] = [
    {
      field: "Usuario",
      headerName: "Usuario",
      minWidth: 250,
      flex: 1,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "EstaActivo",
      headerName: "Habilitado",
      minWidth: 60,
      flex: 0.5,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "IDPerfil",
      headerName: "Roles",
      minWidth: 200,
      flex: 1,
      headerClassName: "headerGrid",
      editable: true,
      valueGetter: ({ row }) => {
        return row.Descripcion;
      },
      renderEditCell: renderSelectEditInputCell,
      //type: "number",
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
          titleName="Usuarios"
        />
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
                getRowId={(row: GridRowModel) => row.Id}
                sx={{ boxShadow: 5, borderRadius: "25px" }}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{
                  toolbar: ToolBarUserComponent,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel, rows },
                }}
                loading={openBackdrop}
                onRowClick={(paramas) => {
                  console.log(paramas);
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
          titleName="Asignar Modulos"
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
export default UserConfig;
