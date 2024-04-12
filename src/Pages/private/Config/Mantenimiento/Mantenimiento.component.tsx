import { Grid } from "@mui/material";
import { ModulosConfig } from "..";
import { lazy } from "react";
//import { TextTitleComponent } from "@/components";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

const MantenimientoComponent = () => {
  return (
    <Grid
      container
      spacing={1}
      // flexDirection={"column"}
      sx={{
        marginLeft: "1rem",
        background: "#fafafa",
        borderRadius: "25px",
        padding: "25px",
      }}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <Grid item xs={12}>
        <TextTitleComponent
          variante="h2"
          color="#1976ce"
          titleName="Mantenimiento"
        />
      </Grid>
      <Grid item xs={8}>
        <ModulosConfig />
      </Grid>
      {/* <Grid item xs={6}>
        <PermisosConfig />
      </Grid> */}
    </Grid>
  );
};
export default MantenimientoComponent;
