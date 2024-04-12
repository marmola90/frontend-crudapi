import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, Tooltip } from "@mui/material";
import { DataGridComponent } from "../..";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { ChangeEvent, lazy, useState } from "react";
import {
  getVersionCapturadores,
  insertVersionCapturador,
  updateVersionCapturador,
} from "@/services/index.ts";
import { PermisosTypes, TablasVersion } from "@/models/index.ts";
import { RenderEditName } from "../../Component";
import { useSelector } from "react-redux";
import { AppStore } from "@/redux/store.ts";
import { Search } from "@/Pages/private/Component/Search";
import useManageSession from "@/Hooks/useManageSession";
import useLoadData from "@/Hooks/useLoadData";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);
const SnackBarComponent = lazy(
  () => import("@/components/SnackBar/SnackBar.component")
);

const ToolBarComponent = lazy(() => import("./Components/ToolBar.component"));

const initialXnetState: GridRowsProp = [
  {
    ID: 0,
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
  },
];

const Xnet = () => {
  const { managesSession } = useManageSession();
  const userState = useSelector((store: AppStore) => store.user);
  const {
    rows,
    setRows,
    permisos,
    rowModesModel,
    setRowModesModel,
    cargarDatos,
    setSnackbar,
    snackbar,
    openBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
  } = useLoadData(
    initialXnetState,
    getVersionCapturadores,
    userState.datos.IDPerfil
  );
  const [search, setSearch] = useState("");

  const handleEditClick = (id: GridRowId) => () => {
    if (permisos.includes(PermisosTypes.Actualizar)) {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    } else {
      setSnackbar({
        variant: "filled",
        children: "Usuario no autorizado.",
        severity: "warning",
      });
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.ID === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.ID !== id));
    }
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const insertDatos = async (rowTablaX: GridRowModel) => {
    if (rowTablaX.CODIGO !== "" && rowTablaX.TABLA !== "") {
      await insertVersionCapturador(rowTablaX as TablasVersion)
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
              children: "Registro insertado.",
              severity: "success",
            });
            cargarDatos();
          }
        })
        .catch((err) => {
          const message = err.message.match("SESSION_NO_VALIDA")?.[0];
          managesSession(message);
        });
    } else {
      setSnackbar({
        children: "Campos TABLA y CODIGOS vacíos.",
        severity: "warning",
      });
    }
  };

  const updateDatos = async (rowTablaX: GridRowModel) => {
    await updateVersionCapturador(rowTablaX as TablasVersion)
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
            children: "Registro actualizado.",
            severity: "success",
          });
          cargarDatos();
        }
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        managesSession(message);
      });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    if (newRow.isNew) {
      insertDatos(newRow);
    } else {
      updateDatos(newRow);
    }

    setRows(rows.map((row) => (row.ID === newRow.ID ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    if (permisos.includes(PermisosTypes.Actualizar)) {
      setRowModesModel(newRowModesModel);
    } else {
      setSnackbar({
        variant: "filled",
        children: "Usuario no autorizado.",
        severity: "warning",
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "TABLA",
      headerName: "Tabla",
      headerClassName: "headerGrid",
      editable: true,
      flex: 0.5,
      type: "string",
      preProcessEditCellProps: (params) => {
        const hasError =
          params.id !== "" && params.props.value !== params.row.TABLA
            ? "Campo llave no se puede modificar"
            : false;
        return {
          ...params.props,
          error: hasError,
        };
      },
      renderEditCell: RenderEditName,
    },
    {
      field: "CODIGO",
      headerName: "Codigo",
      flex: 1,
      minWidth: 120,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
      preProcessEditCellProps: (params) => {
        console.log(params);
        const hasError =
          params.id !== "" && params.props.value !== params.row.CODIGO
            ? "Campo llave no se puede modificar"
            : false;
        return {
          ...params.props,
          error: hasError,
        };
      },
      renderEditCell: RenderEditName,
    },
    {
      field: "DESCRIPCION",
      headerName: "Descripcion",
      flex: 1,
      minWidth: 200,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "VERSION",
      headerName: "Version",
      headerClassName: "headerGrid",
      flex: 0.5,
      minWidth: 80,
      editable: true,
      type: "string",
    },
    {
      field: "ACTIVO",
      headerName: "Activo",
      headerClassName: "headerGrid",
      editable: true,
      flex: 0.5,
      type: "string",
    },
    {
      field: "LINK",
      headerName: "Link",
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "SIGLAS",
      headerName: "Siglas",
      headerClassName: "headerGrid",
      editable: true,
      minWidth: 100,
      flex: 0.5,
      //align: "center",
      type: "string",
    },
    {
      field: "LoginPorInstitucion",
      headerName: "Login Por Institucion",
      flex: 1,
      minWidth: 140,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "Imagen",
      headerName: "Imagen",
      headerClassName: "headerGrid",
      editable: true,
      flex: 1,
      type: "string",
    },
    {
      field: "ReportaDatos",
      headerName: "Reporta Datos",
      flex: 0.5,
      minWidth: 120,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "AccesoAInstituciones",
      headerName: "Acceso A Instituciones",
      flex: 0.5,
      minWidth: 155,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "DescripcionHTML",
      headerName: "Descripcion HTML",
      width: 150,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "AccesoTipoInstitucion",
      headerName: "Acceso Tipo Institucion",
      flex: 0.5,
      //width: 160,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      flex: 0.1,
      minWidth: 100,
      cellClassName: "actions",
      headerClassName: "headerGrid",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
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
          <Tooltip title="Editar">
            <GridActionsCellItem
              icon={<EditIcon sx={{ color: "#1d8df8" }} />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              // color="inherit"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredRows = rows.filter((item) =>
    item.CODIGO.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
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
        xs
        lg
        sm
        md
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
          borderRadius: "25px",
        }}
      >
        <TextTitleComponent
          variante="h2"
          color="#353535de"
          titleName="XNET TABLAS"
        />

        <Search placeholder="Buscar..." onSearchChange={onSearchChange} />
        <Box sx={{ height: 700, mt: 5 }}>
          <DataGridComponent
            columns={columns}
            rows={filteredRows}
            editMode="row"
            getRowId={(row: GridRowModel) => row.ID}
            sx={{ boxShadow: 5, borderRadius: "25px" }}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            slots={{
              toolbar: ToolBarComponent,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel, rows, permisos },
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
  );
};
export default Xnet;
