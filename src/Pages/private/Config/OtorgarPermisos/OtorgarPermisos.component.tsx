import { AlertProps, Button, Grid, IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { IItems, Sessions } from "@/models";
import {
  asignarPermiso,
  deletePermisoAsignado,
  getAllPermisos,
  permisosAsignados,
} from "@/services";
import { SnackBarComponent } from "@/components";
import { CustomListComponent } from "../..";
import useManageSession from "@/Hooks/useManageSession";

const not = (a: IItems[], b: IItems[]) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a: IItems[], b: IItems[]) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

const union = (a: IItems[], b: IItems[]) => {
  return [...a, ...not(b, a)];
};
interface Props {
  perfilId: number;
  available: boolean;
}

const OtorgarPermisosConfig = ({ perfilId, available }: Props) => {
  const [permisos, setPermisos] = useState<IItems[]>([]);
  const [permAsignados, setPermAsignados] = useState<IItems[]>([]);
  const [permisosDisponibles, setPermisosDisponibles] = useState<IItems[]>([]);
  const { managesSession } = useManageSession();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [checked, setChecked] = useState<IItems[]>([]);
  const [asignado, setAsignado] = useState(false);

  const leftChecked = intersection(checked, permAsignados);
  const rightChecked = intersection(checked, permisosDisponibles);

  const handleToggle = (value: IItems) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  const numberOfChecked = (items: IItems[]) =>
    intersection(checked, items)?.length;

  const handleToggleAll = (items: IItems[]) => () => {
    if (numberOfChecked(items) === items.length)
      setChecked(not(checked, items));
    else setChecked(union(checked, items));
  };

  const handleCheckedRight = () => {
    setPermisosDisponibles(permisosDisponibles.concat(leftChecked));
    setPermAsignados(not(permAsignados, leftChecked));
    setChecked(not(checked, leftChecked));
    setAsignado(false);
  };

  const handleCheckedLeft = () => {
    setPermAsignados(permAsignados?.concat(rightChecked));
    setPermisosDisponibles(not(permisos, rightChecked));
    setChecked(not(checked, rightChecked));
    setAsignado(true);
  };

  const asignarPermisos = async () => {
    const valoresAsignados = permAsignados.map((item) => {
      return { IDPerfil: perfilId, IDPermisos: item.Id };
    });
    console.log(valoresAsignados);

    await asignarPermiso(valoresAsignados)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Error" || data.Error) {
          setSnackbar({
            children:
              data.status === "Error"
                ? data.data.ErrorDetail
                : data.description,
            severity: "error",
          });
        } else {
          setSnackbar({
            children: "successfully assgined",
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

  const eliminarAsignados = async () => {
    const valoresAsignados = permisosDisponibles.map((item) => {
      return { IDPerfil: perfilId, IDPermisos: item.Id };
    });
    console.log(valoresAsignados);

    await deletePermisoAsignado(valoresAsignados)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Error" || data.Error) {
          setSnackbar({
            children:
              data.status === "Error"
                ? data.data.ErrorDetail
                : data.description,
            severity: "error",
          });
        } else {
          setSnackbar({
            children: "successfully assgined",
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

  const handleAgregarPermisosAsignados = () => {
    asignado ? asignarPermisos() : eliminarAsignados();
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const cargarPermisosAsignados = async (IDPerfil: number) => {
    await permisosAsignados(IDPerfil)
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          // console.log(datos);
          setPermAsignados(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarPermisos = async () => {
    await getAllPermisos()
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setPermisos(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarPermisosDisponibles = () => {
    const IdPermisos = permAsignados?.map((item) => item.Id);
    console.log(IdPermisos);
    setPermisosDisponibles(
      permisos?.filter((item) => !IdPermisos?.includes(item.Id))
    );
  };

  useEffect(() => {
    cargarPermisos();
    cargarPermisosAsignados(perfilId);
    // cargarPermisosDisponibles(); // estos van en onChange
  }, [perfilId]);

  useEffect(() => {
    cargarPermisosDisponibles();
    let count = 0;
    console.log(count++);
  }, [permisos, permAsignados]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item sm={5} xs={5}>
        {/* customList("Permisos Asignados", permAsignados)*/}
        <CustomListComponent
          title="Asignados"
          items={permAsignados}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          numberOfChecked={numberOfChecked}
          available={available}
          checked={checked}
        />
      </Grid>
      <Grid item sm={2} xs={2}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
            color="primary"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
            color="primary"
          >
            &lt;
          </Button>
          <IconButton
            sx={{ my: 0.5, boxShadow: "1px 1px 1px 1px #fafafa" }}
            size="medium"
            onClick={handleAgregarPermisosAsignados}
            disabled={available === false}
            color="primary"
          >
            <SaveIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item sm={5} xs={5}>
        {/*customList("Permisos Disponibles", permisosDisponibles)*/}
        <CustomListComponent
          title="Disponibles"
          items={permisosDisponibles}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          numberOfChecked={numberOfChecked}
          available={available}
          checked={checked}
        />
      </Grid>

      {!!snackbar && (
        <SnackBarComponent snackbar={snackbar} onClose={handleCloseSnackbar} />
      )}
    </Grid>
  );
};
export default OtorgarPermisosConfig;
