import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { ChangeEvent, lazy, useState } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { DataGridComponent } from "../../component/DataGrid";
import { Search } from "@/Pages/private/Component/Search";
import { getAllLogEvento } from "@/services/logEventos.service";
//import { AppStore } from "@/redux/store";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import copy from "copy-to-clipboard";
import useLoadData from "@/Hooks/useLoadData";

const SnackBarComponent = lazy(
  () => import("@/components/SnackBar/SnackBar.component")
);

const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

const initialModuleState: GridRowsProp = [
  {
    Id_Log: 0,
    Usuario: "",
    Error: false,
    Resultado: "",
    Fecha: new Date().toLocaleString("en-EN", { timeZone: "UTC" }),
    Pantalla: "",
    Ref_ID: "",
  },
];

const LogEventos = () => {
  const { rows, setSnackbar, snackbar, openBackdrop, handleCloseSnackbar } =
    useLoadData(initialModuleState, getAllLogEvento);

  //const userState = useSelector((store: AppStore) => store.user);
  const [search, setSearch] = useState("");
  // console.log(userState);
  const copyToClipboard = async (opt: number, val?: string | GridRowId) => {
    const user = val as string;

    if (opt === 1) {
      copy(user);
      setSnackbar({
        children: "El Resultado se copio correctamente.",
        severity: "info",
      });
    }
  };
  const columns: GridColDef[] = [
    {
      field: "Usuario",
      headerName: "Usuario",
      //minWidth: 50,
      // width: 70,
      flex: 0.25,
      headerClassName: "headerGrid",
      type: "string",
    },
    {
      field: "Error",
      headerName: "Error",
      flex: 0.1,
      headerClassName: "headerGrid",
      type: "boolean",
    },
    {
      field: "Resultado",
      headerName: "Resultado",
      // minWidth: 200,
      flex: 1,
      headerClassName: "headerGrid",
      type: "string",
    },
    {
      field: "Fecha",
      headerName: "Fecha",
      align: "center",
      //minWidth: 50,
      flex: 0.28,
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
      field: "Pantalla",
      headerName: "Pantalla",
      //  minWidth: 50,
      //width: 80,
      flex: 0.2,
      headerClassName: "headerGrid",
      //align: "center",
      type: "string",
    },
    {
      field: "Ref_ID",
      headerName: "Ref ID",
      minWidth: 210,
      flex: 0.3,
      headerClassName: "headerGrid",
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions ",
      minWidth: 100,
      flex: 0.1,
      cellClassName: "actions",
      headerClassName: "headerGrid",
      getActions: ({ row }) => {
        return [
          <>
            <Tooltip title="Copiar Resultado">
              <GridActionsCellItem
                icon={
                  <FileCopyIcon
                    sx={{
                      color: "#252525",
                    }}
                  />
                }
                label="Copiar Resultado"
                //className="textPrimary"
                onClick={() => copyToClipboard(1, row.Resultado)}
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

  const filteredRows = rows.filter(
    (item) =>
      item.Ref_ID.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      item.Usuario.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

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
            titleName="Log Eventos"
          />
          <Search placeholder="Buscar..." onSearchChange={onSearchChange} />

          <Box sx={{ height: 700, mt: 1 }}>
            <DataGridComponent
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    isEnable: false,
                  },
                },
              }}
              columns={columns}
              rows={filteredRows}
              editMode="row"
              getRowId={(row: GridRowModel) => row.Id_Log}
              sx={{ boxShadow: 5, borderRadius: "25px" }}
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
export default LogEventos;
