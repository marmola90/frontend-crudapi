import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  AlertProps,
  Box,
  Grid,
  Snackbar,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import { DataGridComponent, ToolBarComponent } from "..";
import {
  GridActionsCellItem,
  GridColDef,
  GridEditInputCell,
  GridEventListener,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import {
  getVersionCapturadores,
  insertVersionCapturador,
  updateVersionCapturador,
} from "../../../../services";
import { useNavigate } from "react-router-dom";
import { RutasPublicas, Sessions, TablasVersion } from "../../../../models";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../../redux/states/user";

const initialXnetState: GridRowsProp = [
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
  },
];

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props: GridRenderEditCellParams) {
  const { error } = props;
  const props1 = { ...props, ediTable: false };
  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props1} />
    </StyledTooltip>
  );
}

function renderEditName(params: GridRenderEditCellParams) {
  return <NameEditInputCell {...params} />;
}

const Xnet = () => {
  const [rows, setRows] = useState(initialXnetState);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  //const [rowXnetTabla, setRowXnetTabla] = useState(initialRowXnetState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.CODIGO === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.CODIGO !== id));
    }
  };

  const managesSession = (status: Sessions) => {
    if (status === Sessions.SESSION_NO_VALIDA) {
      setRows(initialXnetState);
      navigate(`/${RutasPublicas.LOGIN}`, { replace: true });
      dispatch(resetUser());
    }
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const insertDatos = async (rowTablaX: GridRowModel) => {
    await insertVersionCapturador(rowTablaX as TablasVersion)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });
      })
      .catch((err) => {
        const message = err.message.match("SESSION_NO_VALIDA")?.[0];
        if (message === Sessions.SESSION_NO_VALIDA) {
          managesSession(message);
        }
      });
  };

  const updateDatos = async (rowTablaX: GridRowModel) => {
    await updateVersionCapturador(rowTablaX as TablasVersion)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSnackbar({
          children: "User successfully saved",
          severity: "success",
        });
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

    setRows(
      rows.map((row) =>
        row.TABLA === newRow.TABLA && row.CODIGO === newRow.CODIGO
          ? updatedRow
          : row
      )
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "TABLA",
      headerName: "Tabla",
      headerClassName: "headerGrid",
      editable: true,
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
      renderEditCell: renderEditName,
    },
    {
      field: "CODIGO",
      headerName: "Codigo",
      width: 120,
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
      renderEditCell: renderEditName,
    },
    {
      field: "DESCRIPCION",
      headerName: "Descripcion",
      width: 170,
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "VERSION",
      headerName: "Version",
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "ACTIVO",
      headerName: "Activo",
      headerClassName: "headerGrid",
      editable: true,
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
      type: "string",
    },
    {
      field: "LoginPorInstitucion",
      headerName: "Login Por Institucion",
      width: 150,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "Imagen",
      headerName: "Imagen",
      headerClassName: "headerGrid",
      editable: true,
      type: "string",
    },
    {
      field: "ReportaDatos",
      headerName: "Reporta Datos",
      width: 120,
      headerClassName: "headerGrid",
      editable: true,
      type: "boolean",
    },
    {
      field: "AccesoAInstituciones",
      headerName: "Acceso A Instituciones",
      width: 155,
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
      width: 160,
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

  const cargaDatos = async () => {
    await getVersionCapturadores()
      .then((res) => res.json())
      .then((datos) => setRows(datos.data))
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  useEffect(() => {
    cargaDatos();
    let count = 0;
    console.log(count++);
  }, []);

  return (
    <Grid
      component="main"
      sx={{
        display: "flex",
      }}
    >
      <Grid container spacing={2} rowSpacing={8} direction="column">
        <Grid item sx={{ width: "500px" }}></Grid>
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
          }}
        >
          <Box sx={{ height: 700 }}>
            <DataGridComponent
              columns={columns}
              rows={rows}
              editMode="row"
              getRowId={(row) => row.TABLA + row.CODIGO}
              sx={{ boxShadow: 5 }}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              slots={{
                toolbar: ToolBarComponent,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
            {!!snackbar && (
              <Snackbar
                open
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
              >
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Xnet;
