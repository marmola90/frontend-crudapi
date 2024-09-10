import { GridRowId, GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { useCallback, useEffect, useState } from "react";
import useManageSession from "../v2/useManageSession";
import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid/models";
import { AlertProps } from "@mui/material/Alert";
import { permisosAsignados } from "@/services";
import { IItems } from "@/models";

const useLoadData = (
  intialState: GridRowsProp,
  getLoadData: () => Promise<Response>,
  IDPerfil?: number
) => {
  const [rows, setRows] = useState(intialState);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { managesSession } = useManageSession();
  const [permisos, setPermisos] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity" | "variant"
  > | null>(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
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

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const cargarDatos = async () => {
    await getLoadData()
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos.data);

        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setRows(datos.data);
        }
        setOpenBackdrop(false);
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarPermisosAsignados = async (IDPerfil: number | undefined) => {
    await permisosAsignados(IDPerfil)
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          //console.log(datos.data);
          const data = datos.data.map((item: IItems) => item.Id);
          setPermisos(data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  useEffect(() => {
    setOpenBackdrop(true);
    cargarDatos();
    cargarPermisosAsignados(IDPerfil);
  }, []);

  return {
    rows,
    setRows,
    permisos,
    rowModesModel,
    setRowModesModel,
    cargarDatos,
    snackbar,
    setSnackbar,
    openBackdrop,
    setOpenBackdrop,
    handleCloseSnackbar,
    handleProcessRowUpdateError,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleRowModesModelChange,
  };
};

export default useLoadData;
