import { Box, Container, Typography } from "@mui/material";
import { ButtonComponent } from "./component/";
import { useNavigate } from "react-router-dom";
import { RutasPrivadas } from "../../../models";

const Modulos = () => {
  const navigate = useNavigate();

  const clickModulos = (valor: string) => {
    switch (valor) {
      case "xnet":
        navigate(RutasPrivadas.XNET);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Container component="main">
        <Box
          sx={{
            marginTop: 6,
          }}
        >
          <ButtonComponent>
            <Typography
              variant="h5"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => clickModulos("xnet")}
            >
              XNET
            </Typography>
          </ButtonComponent>
        </Box>
      </Container>
    </>
  );
};
export default Modulos;
