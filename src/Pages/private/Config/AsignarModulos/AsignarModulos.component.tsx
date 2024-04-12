import { AlertProps, Button, Grid, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { IItems, Sessions } from "@/models";
import {
  asignarModulos,
  deleteModulosAsignado,
  getAllModulos,
  getModulosAsignados,
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

const AsignarModulosConfig = ({ perfilId, available }: Props) => {
  const [modulos, setModulos] = useState<IItems[]>([]);
  const [modulosAsignados, setmodulosAsignados] = useState<IItems[]>([]);
  const [modulosDisponibles, setModulosDisponibles] = useState<IItems[]>([]);
  const { managesSession } = useManageSession();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [checked, setChecked] = useState<IItems[]>([]);
  const [asignado, setAsignado] = useState(false);
  //const [available, setAvailable] = useState(false);

  const leftChecked = intersection(checked, modulosAsignados);
  const rightChecked = intersection(checked, modulosDisponibles);

  const handleToggle = (value: IItems) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };
  console.log(perfilId);
  const numberOfChecked = (items: IItems[]) =>
    intersection(checked, items)?.length;

  const handleToggleAll = (items: IItems[]) => () => {
    if (numberOfChecked(items) === items.length)
      setChecked(not(checked, items));
    else setChecked(union(checked, items));
  };

  const handleCheckedRight = () => {
    setModulosDisponibles(modulosDisponibles.concat(leftChecked));
    setmodulosAsignados(not(modulosAsignados, leftChecked));
    setChecked(not(checked, leftChecked));
    setAsignado(false);
  };

  const handleCheckedLeft = () => {
    setmodulosAsignados(modulosAsignados?.concat(rightChecked));
    setModulosDisponibles(not(modulos, rightChecked));
    setChecked(not(checked, rightChecked));
    setAsignado(true);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const cargarModulosDisponibles = () => {
    const IdModulo = modulosAsignados?.map((item) => item.Id);

    setModulosDisponibles(
      modulos?.filter((item) => !IdModulo?.includes(item.Id))
    );
  };

  const cargarModulosAsignados = async (IDPerfil: number) => {
    await getModulosAsignados(IDPerfil)
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          // console.log(datos);
          setmodulosAsignados(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarModulos = async () => {
    await getAllModulos()
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos.data);
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setModulos(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };
  const agregarModulos = async () => {
    const valoresAsignados = modulosAsignados.map((item) => {
      return { IDPerfil: perfilId, IdModulo: item.Id };
    });
    console.log(valoresAsignados);

    await asignarModulos(valoresAsignados)
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
    const valoresAsignados = modulosDisponibles.map((item) => {
      return { IDPerfil: perfilId, IdModulo: item.Id };
    });
    console.log(valoresAsignados);

    await deleteModulosAsignado(valoresAsignados)
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

  const handleAgregarModulosAsignados = () => {
    asignado ? agregarModulos() : eliminarAsignados();
  };

  useEffect(() => {
    cargarModulos();
    cargarModulosAsignados(perfilId);
  }, [perfilId]);

  useEffect(() => {
    cargarModulosDisponibles();

    let count = 0;
    console.log(count++);
  }, [modulos, modulosAsignados]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item sm={5} xs={5}>
        {/* customList("Permisos Asignados", permAsignados)*/}
        <CustomListComponent
          title="Asignados"
          items={modulosAsignados}
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
            onClick={handleAgregarModulosAsignados}
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
          items={modulosDisponibles}
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
export default AsignarModulosConfig;
