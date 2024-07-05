import {
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { ChangeEvent, lazy, useCallback, useEffect, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ITipoUsuario,
  IUserEncrypt,
  PermisosTypes,
  Roles,
  Sessions,
} from "@/models";
import { useSelector } from "react-redux";
import {
  // getAllUsers,
  //  getAllUsersAppXUrl,
  // getAllUsersPCSUrl,
  getTipoUsuarioUrl,
  postDecryptPass,
  postInsertUser,
  putUpdateUser,
} from "@/services/userEncrypt.service";
import { AppStore } from "@/redux/store";
import copy from "copy-to-clipboard";
import { Search } from "@/Pages/private/Component/Search";
import { DataGridComponent } from "../component/DataGrid";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
import { getOpcionesDefault, getOpcionesID } from "@/utils/funcionesVarias";
const SnackBarComponent = lazy(
  () => import("@/components/SnackBar/SnackBar.component")
);
const InputEditPassword = lazy(
  () => import("./Components/InputEditPassword.component")
);
const ToolBarControlUsuarios = lazy(
  () => import("./Components/ToolBarControlUsuarios.component")
);

const SelectTipoUsuario = lazy(
  () => import("./Components/SelectTipoUsuario.component")
);

const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

const initialModuleState: GridRowsProp = [
  {
    Id: 0,
    Usuario: "",
    Gestor: "",
    Aplicacion: "",
    PwdEncryted: "",
    DireccionApp: "",
    FechaModificacion: "",
    Appx: false,
    isEnable: true,
    TipoUsuario: 1,
  },
];

const ControlUsuarios = () => {
  const userState = useSelector((store: AppStore) => store.user);
  const { managesSession } = useManageSession();

  /*  const getOpciones =
    getOpcionesID[userState.datos.IDPerfil as number] || getOpcionesDefault; */
  /* userState.datos.IDPerfil === Roles.ADMINAPP
      ? getAllUsers
      : userState.datos.IDPerfil === Roles.CONSULSOPORTE
      ? getAllUsersPCSUrl
      : userState.datos.IDPerfil === Roles.CONSULADMON
      ? getAllUsersAppXUrl
      : getAllUsers; */

  //console.log(getOpciones());
  const {
    rows,
    setRows,
    permisos,
    rowModesModel,
    setRowModesModel,
    cargarDatos: cargarUsuarios,
    setSnackbar,
    snackbar,
    openBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleRowModesModelChange,
  } = useLoadData(
    initialModuleState,
    getOpcionesID[userState.datos.IDPerfil as number] || getOpcionesDefault,
    userState.datos.IDPerfil
  );
  const [tipoUsuario, setTipoUsuario] = useState<ITipoUsuario[]>([]);
  const [search, setSearch] = useState("");

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleEditClick = (id: GridRowId) => () => {
    permisos.includes(PermisosTypes.Actualizar)
      ? setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.Edit },
        })
      : setSnackbar({
          children: "Usuario no autorizado ",
          severity: "warning",
        });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    permisos.includes(PermisosTypes.Insertar)
      ? setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        })
      : setSnackbar({
          children: "Usuario no autorizado ",
          severity: "warning",
        });
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

  const insertDatos = async (user: GridRowModel) => {
    const insertUser = {
      ...user,
      TipoUsuario: tipoUsuario.filter(
        (item) => item.TipoUsuario === user.TipoUsuario
      )[0].IdTipo,
    };

    await postInsertUser(insertUser as IUserEncrypt)
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
          cargarUsuarios();
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
    const updatedUser = {
      ...user,
      TipoUsuario: tipoUsuario.filter(
        (item) => item.TipoUsuario === user.TipoUsuario
      )[0].IdTipo,
    };
    console.log({ updatedUser });
    await putUpdateUser(updatedUser as IUserEncrypt)
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
          cargarUsuarios();
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
    setRows(rows.map((row) => (row.Id === newRow.Id ? updatedRow : row)));

    return updatedRow;
  };

  const renderInputEditPass: GridColDef["renderCell"] = useCallback(
    (params: GridRenderCellParams) => {
      return <InputEditPassword {...params} />;
    },
    []
  );

  const copyToClipboard = async (opt: number, val?: string | GridRowId) => {
    const id = val as number;
    const user = val as string;

    if (opt === 1) {
      copy(user);
      setSnackbar({
        children: "El Usuario se copio correctamente.",
        severity: "info",
      });
    } else {
      postDecryptPass(id)
        .then((res) => res.json())
        .then((pass) => {
          if (pass.status === "Error") {
            setSnackbar({
              children: pass.data.ErrorDetail,
              severity: "error",
            });
          } else {
            //console.log(pass.data.Pwd);
            copy(pass.data.Pwd);
            setSnackbar({
              children: "El Password se copio correctamente.",
              severity: "info",
            });
          }
        })
        .catch((err) => {
          const message = err.message.match("SESSION_NO_VALIDA")?.[0];
          if (message === Sessions.SESSION_NO_VALIDA) {
            managesSession(message);
          }
        });
    }
  };

  const renderSelectEditInputCell: GridColDef["renderCell"] = useCallback(
    (params: GridRenderCellParams) => {
      return <SelectTipoUsuario {...params} />;
    },
    []
  );

  const columns: GridColDef[] = [
    {
      field: "Usuario",
      headerName: "Usuario",
      //minWidth: 50,
      //  width:100,
      flex: 0.3,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      type: "string",
    },
    {
      field: "PwdEncryted",
      headerName: "Password",
      //minWidth: 50,
      flex: 0.35,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === (Roles.ADMINAPP || Roles.CONSULADMON)
          ? true
          : false,
      type: "string",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextField type="password" value={params.value.data} fullWidth />
        );
      },
      renderEditCell: renderInputEditPass,
    },
    {
      field: "Gestor",
      headerName: "Gestor",
      flex: 0.2,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      type: "string",
    },
    {
      field: "DireccionApp",
      headerName: "Aplicación",
      // minWidth: 200,
      flex: 0.3,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      type: "string",
    },
    {
      field: "FechaModificacion",
      headerName: "Fecha Modificación",
      //minWidth: 50,
      flex: 0.2,
      headerClassName: "headerGrid",
      editable: false,
      type: "string",
      valueGetter: (params) => {
        return params.value !== null
          ? new Date(params.value).toLocaleString("en-EN", { timeZone: "UTC" })
          : "";
      },
    },
    {
      field: "TipoUsuario",
      headerName: "Tipo Usuario",
      //  minWidth: 50,
      //width: 80,
      flex: 0.2,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      //align: "center",
      //type: "number",
      renderEditCell: renderSelectEditInputCell,
      valueGetter: (params) => {
        const dato2 = tipoUsuario.filter(
          (item) => item.IdTipo === params.value
        )[0];
        return dato2?.TipoUsuario;
      },
    },
    {
      field: "AppX",
      headerName: "Uso en Apps",
      //   minWidth: 200,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      type: "boolean",
    },
    {
      field: "isEnable",
      headerName: "Habilitado",
      //   minWidth: 200,
      headerClassName: "headerGrid",
      editable:
        userState.datos.IDPerfil === Roles.ADMINAPP ||
        userState.datos.IDPerfil === Roles.CONSULADMON
          ? true
          : false,
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      minWidth: 120,
      flex: 0.1,
      cellClassName: "actions",
      headerClassName: "headerGrid",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (
          (userState.datos.IDPerfil === Roles.ADMINAPP ||
            userState.datos.IDPerfil === Roles.CONSULADMON) &&
          isInEditMode
        ) {
          return [
            <Tooltip title="Guardar">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "#3A833A",
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancelar">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                //className="textPrimary"
                onClick={handleCancelClick(id)}
                sx={{ color: "darkred" }}
                // color="inherit"
              />
            </Tooltip>,
          ];
        }

        return [
          <>
            <Tooltip title="Editar">
              <GridActionsCellItem
                icon={<EditIcon sx={{ color: "#1d8df8" }} />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                // color="inherit"
              />
            </Tooltip>
            <Tooltip title="Copiar Usuario">
              <GridActionsCellItem
                icon={
                  <PersonPinIcon
                    sx={{
                      color: "#252525",
                    }}
                  />
                }
                label="Copiar Usuario"
                //className="textPrimary"
                onClick={() => copyToClipboard(1, row.Usuario)}
              />
            </Tooltip>
            <Tooltip title="Copiar Password">
              <GridActionsCellItem
                icon={<LockIcon sx={{ color: "#f50057" }} />}
                label="Copiar Password"
                //className="textPrimary"
                onClick={() => copyToClipboard(0, id)}
                // color="secondary"
              />
            </Tooltip>
          </>,
        ];
      },
    },
  ];

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  console.time("Tiempo sin memo");
  const filteredRows: GridValidRowModel[] = rows.filter(
    (item) =>
      item.Gestor?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      item.Usuario.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  console.log({ filteredRows });
  console.timeEnd("Tiempo sin memo");

  const filterModel: GridFilterModel = {
    items: [
      { field: "isEnable", operator: "is", value: !checked },
      //{ field: "Gestor", operator: "equals", value: search },
    ],
    //    logicOperator: GridLogicOperator.Or,
  };

  useEffect(() => {
    const cargarTipoUsuario = async () => {
      await getTipoUsuarioUrl()
        .then((res) => res.json())
        .then((datos) => {
          if (datos.status === "Error") {
            setSnackbar({
              children: datos.data.ErrorDetail,
              severity: "error",
            });
          } else {
            setTipoUsuario(datos.data);
          }
        });
    };
    cargarTipoUsuario();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={1}
        //rowSpacing={8}
        // direction="column"
        flexDirection={"column"}
        sx={{
          //  width: "100em",
          marginLeft: "1rem",
          background: "#fafafa",
          borderRadius: "25px",
          padding: "25px",
        }}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Grid
          item
          md
          sm
          xs
          lg
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
            variante="h2"
            color="#353535de"
            titleName=" Control de Usuarios"
          />
          <Search placeholder="Buscar..." onSearchChange={onSearchChange} />
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                color="warning"
                disabled={
                  userState.datos.IDPerfil === Roles.ADMINAPP ? false : true
                }
              />
            }
            label="Usuarios Habilitados"
            sx={{ mb: 3 }}
          />
          <Box sx={{ height: 700 }}>
            <DataGridComponent
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    isEnable: false,
                    AppX: false,
                  },
                },
              }}
              columns={columns}
              filterModel={filterModel}
              rows={filteredRows}
              editMode="row"
              getRowId={(row: GridRowModel) => row.Id}
              sx={{ boxShadow: 5, borderRadius: "25px" }}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              slots={{
                toolbar: ToolBarControlUsuarios,
              }}
              slotProps={{
                toolbar: {
                  setRows,
                  setRowModesModel,
                  permisos,
                },
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
    </>
  );
};
export default ControlUsuarios;
