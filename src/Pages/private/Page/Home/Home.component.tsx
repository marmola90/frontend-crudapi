import {
  AlertProps,
  Box,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Groups3Icon from "@mui/icons-material/Groups3";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import {
  IModulos,
  IPerfil,
  IPermisos,
  IRolesCantidadAsignados,
  IUser,
} from "@/models";
import { lazy, useEffect, useState } from "react";
import {
  getAllModulos,
  getAllPerfil,
  getAllPermisos,
  getAllRolesModulosCantidad,
  getAllUsersRoles,
  getAllUsersRolesCantidad,
} from "@/services";
import { BackdropComp, SnackBarComponent } from "@/components";
import CardsItemComponent from "@/Pages/private/Component/Cards/CardsItem.component";
import ChartsLineComponent from "@/Pages/private/Component/Charts/ChartsLine.component";
import useManageSession from "@/Hooks/useManageSession";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

const HomeComponent = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [perfil, setPerfil] = useState<IPerfil[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesCantidad, setRolesCantidad] = useState<number[]>([]);
  const [rolesModulos, setRolesModulos] = useState<string[]>([]);
  const [rolesModulosCantidad, setRolesModulosCantidad] = useState<number[]>(
    []
  );
  const [modulos, setModulos] = useState<IModulos[]>([]);
  const [permisos, setPermisos] = useState<IPermisos[]>([]);
  const { managesSession } = useManageSession();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const cargarUsers = async () => {
    await getAllUsersRoles()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setUsers(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarPerfil = async () => {
    await getAllPerfil()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          setPerfil(datos.data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarRolesCantidad = async () => {
    await getAllUsersRolesCantidad()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          const data: IRolesCantidadAsignados[] = datos.data;
          const desc = data.map(
            (item: IRolesCantidadAsignados) => item.Descripcion
          );
          const cant = data.map(
            (item: IRolesCantidadAsignados) => item.Cantidad
          );

          setRoles(desc);
          setRolesCantidad(cant);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };

  const cargarRolesModuloCantidad = async () => {
    await getAllRolesModulosCantidad()
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          const data: IRolesCantidadAsignados[] = datos.data;
          const desc = data.map(
            (item: IRolesCantidadAsignados) => item.Descripcion
          );
          const cant = data.map(
            (item: IRolesCantidadAsignados) => item.Cantidad
          );

          setRolesModulos(desc);
          setRolesModulosCantidad(cant);
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
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          const dat = datos.data.map(
            (item: { Id: number; Descripcion: string; BDAsociada: string }) => {
              return {
                IdModulo: item.Id,
                Descripcion: item.Descripcion,
                BDAsociada: item.BDAsociada,
              };
            }
          );
          setModulos(dat);
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

  useEffect(() => {
    setOpenBackdrop(true);
    const timer = setTimeout(() => {
      cargarUsers();
      cargarPerfil();
      cargarModulos();
      cargarPermisos();
      cargarRolesCantidad();
      cargarRolesModuloCantidad();
      setOpenBackdrop(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "1rem",
          background: "#fafafa",
          borderRadius: "25px",
          //padding: "55px",
          height: "100%",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            my: 10,
          }}
        >
          <TextTitleComponent
            variante="h2"
            color="#353535de"
            titleName="Dashboard"
          />
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <CardsItemComponent
                title="Roles"
                sx={{ height: "100%", borderRadius: "22px" }}
                value={perfil.length.toString()}
                color="error.main"
                icon={<BadgeOutlinedIcon />}
                colorText="text.secondary"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <CardsItemComponent
                title="Usuarios"
                sx={{ height: "100%", borderRadius: "22px" }}
                value={users.length.toString()}
                color="success.main"
                icon={<Groups3Icon />}
                colorText="text.secondary"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <CardsItemComponent
                title="Modulos"
                sx={{
                  height: "100%",
                  borderRadius: "22px",
                }}
                value={modulos.length.toString()}
                color="primary.main"
                icon={<FormatListBulletedIcon />}
                colorText="text.secondary"
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <CardsItemComponent
                title="Permisos"
                sx={{ height: "100%", borderRadius: "22px" }}
                value={permisos.length.toString()}
                color="secondary.dark"
                colorText="text.secondary"
                icon={<ChecklistRtlIcon />}
              />
            </Grid>
            <Grid xs={12} lg={7}>
              {rolesModulosCantidad.length > 0 && (
                <ChartsLineComponent
                  chartSeries={[
                    {
                      name: "Cantidad Modulos",
                      data: rolesModulosCantidad,
                    },
                    /*{
                      name: "Last year",
                      data: [5, 11, 4, 2],
                    },*/
                  ]}
                  sx={{ height: "100%", borderRadius: "22px" }}
                  dataItem={rolesModulos}
                  title="Modulos Asignados por Roles"
                  type="bar"
                  height={350}
                  option={true}
                />
              )}
            </Grid>
            <Grid xs={12} md={6} lg={5}>
              {rolesCantidad.length > 0 && (
                <ChartsLineComponent
                  chartSeries={rolesCantidad}
                  dataItem={roles}
                  sx={{
                    height: "100%",
                    borderRadius: "22px",
                  }}
                  title="Roles Asignados"
                  type="donut"
                  height={400}
                  option={false}
                />
              )}
            </Grid>
          </Grid>
        </Container>
        {!!snackbar && (
          <SnackBarComponent
            snackbar={snackbar}
            onClose={handleCloseSnackbar}
          />
        )}
      </Box>
      <BackdropComp
        openBackdrop={openBackdrop}
        setOpenBackdrop={setOpenBackdrop}
      />
    </>
  );
};
export default HomeComponent;
