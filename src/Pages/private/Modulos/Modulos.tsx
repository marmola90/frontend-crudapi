import { AlertProps, Box, Grid, Typography } from "@mui/material";
//import Drawer from "@mui/material/Drawer";
//import { ButtonComponent } from "./component/";
import { useParams } from "react-router-dom";
import { IModulos, RutasPrivadas } from "@/models";
import { lazy, useEffect, useState } from "react";
import { getAllModulos } from "@/services/modulos.service";
import useManageSession from "@/Hooks/useManageSession";

//import { SnackBarComponent } from "@/components";
const SnackBarComponent = lazy(
  () => import("@/components/SnackBar/SnackBar.component")
);
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);
const ButtonComponent = lazy(
  () => import("@/Pages/private/Modulos/component/Button/Button.component")
);

const Modulos = () => {
  const { managesSession, navigate } = useManageSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { Mod }: any = useParams();
  const [modulos, setModulos] = useState<IModulos[]>();
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  console.log(Mod);
  const clickModulos = (valor: string) => {
    switch (valor) {
      case "XNET Capturadores":
        navigate(RutasPrivadas.XNETABLAS);
        break;
      case "Log Eventos":
        navigate(RutasPrivadas.LOGEVENTOS);
        break;

      default:
        setSnackbar({
          children: "NO SE HA IMPLEMENTADO LA RUTA.",
          severity: "warning",
        });
        break;
    }
  };

  const fetchData = async () => {
    await getAllModulos()
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "90%",
        width: "100%",
        background: "#fafafa",
        borderRadius: "25px",
        flexDirection: "column",
        padding: "35px",
      }}
    >
      <TextTitleComponent
        variante="h2"
        color="#353535de"
        titleName={Mod?.toLocaleUpperCase()}
      />
      <Grid
        container
        sx={{
          marginTop: 5,
        }}
        spacing={3}
      >
        {modulos ? (
          modulos?.map((item, i) => {
            if (
              item.BDAsociada.toLocaleLowerCase().includes(
                Mod?.toLocaleLowerCase()
              )
            ) {
              return (
                <Grid item key={i}>
                  <ButtonComponent
                    key={i}
                    onClick={() => clickModulos(item.Descripcion)}
                  >
                    <Typography
                      key={i}
                      variant="h5"
                      component="div"
                      sx={{ cursor: "pointer" }}
                    >
                      {item.Descripcion}
                    </Typography>
                  </ButtonComponent>
                </Grid>
              );
            }
            return <></>;
          })
        ) : (
          <></>
        )}
      </Grid>
      {!!snackbar && (
        <SnackBarComponent snackbar={snackbar} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};
export default Modulos;
