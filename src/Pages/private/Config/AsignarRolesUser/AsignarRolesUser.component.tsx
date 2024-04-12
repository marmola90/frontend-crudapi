import { AlertProps, Button, Grid, IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { IItems, IUser, Sessions } from "@/models";
import { asignarUser, getAllUsers, getUserAsignados } from "@/services";
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

const AsignarRolesConfig = ({ perfilId, available }: Props) => {
  const [users, setUsers] = useState<IItems[]>([]);
  const [userAsignados, setUserAsignados] = useState<IItems[]>([]);
  const [usersDisponibles, setUsersDisponibles] = useState<IItems[]>([]);
  const [userRol, setUserRol] = useState<IUser[]>([]);
  const { managesSession } = useManageSession();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const [checked, setChecked] = useState<IItems[]>([]);
  const [asignado, setAsignado] = useState(false);

  const leftChecked = intersection(checked, userAsignados);
  const rightChecked = intersection(checked, usersDisponibles);

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
    setUsersDisponibles(usersDisponibles.concat(leftChecked));
    setUserAsignados(not(userAsignados, leftChecked));
    setChecked(not(checked, leftChecked));
    setAsignado(false);
  };

  const handleCheckedLeft = () => {
    setUserAsignados(userAsignados?.concat(rightChecked));
    setUsersDisponibles(not(users, rightChecked));
    setChecked(not(checked, rightChecked));
    setAsignado(true);
  };

  const asignarPermisos = async () => {
    const valoresAsignados = userAsignados.map((item) => {
      return { IDPerfil: perfilId, ID: item.Id };
    });
    console.log(valoresAsignados);

    await asignarUser(valoresAsignados)
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
    const valoresAsignados = usersDisponibles.map((item) => {
      return { IDPerfil: null, ID: item.Id };
    });
    console.log(valoresAsignados);

    await asignarUser(valoresAsignados)
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

  const handleAgregarUsersAsignados = () => {
    asignado ? asignarPermisos() : eliminarAsignados();
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const cargarUsersAsignados = async (IDPerfil: number) => {
    await getUserAsignados(IDPerfil)
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          console.log(datos);
          setUserAsignados(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarUsers = async () => {
    await getAllUsers()
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          const valores = datos.data;
          const data = valores.map((item: IUser) => {
            return { Id: item.Id, Descripcion: item.Usuario };
          });
          setUsers(data);
          setUserRol(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarUsersDisponibles = () => {
    const Id = userAsignados?.map((item) => item.Id);

    const hasPerfil = userRol.filter((item) => {
      if (item.IDPerfil !== null) {
        return item.Id;
      }
    });

    const IdPerfil = hasPerfil.map((item) => item.Id);

    const hasPerfilNull = userRol.filter((item) => {
      if (item.IDPerfil === null) {
        return item.Id;
      }
    });

    const IdPerfilNull = hasPerfilNull.map((item) => item.Id);
    setUsersDisponibles(
      users?.filter((item) =>
        Id.length === 0
          ? IdPerfilNull?.includes(item.Id)
          : !IdPerfil.includes(item.Id)
      )
    );
  };

  useEffect(() => {
    cargarUsers();
    cargarUsersAsignados(perfilId);
    // cargarUsersDisponibles();
  }, [perfilId]);

  useEffect(() => {
    cargarUsersDisponibles();
    let count = 0;
    console.log(count++);
  }, [userRol, users]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item sm={5} xs={5}>
        {/* customList("Permisos Asignados", permAsignados)*/}
        <CustomListComponent
          title="Asignados"
          items={userAsignados}
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
            onClick={handleAgregarUsersAsignados}
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
          items={usersDisponibles}
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
export default AsignarRolesConfig;
