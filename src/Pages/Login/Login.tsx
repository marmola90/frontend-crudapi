import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackImage from "../../assets/L04.png";
import { Container } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../../services";
import { createUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import { RutasPrivadas } from "../../models";

const theme = createTheme();

const initialSignin = {
  usuario: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [signIn, setsignIn] = useState(initialSignin);
  const navigate = useNavigate();

  const auth = async () => {
    try {
      const result = await postLogin(signIn.usuario, signIn.password);
      if (result.datos.EstaActivo) {
        dispatch(createUser(result));
        navigate(`/${RutasPrivadas.PRIVATE}`, { replace: true });
      } else {
        alert("El usuario no esta activo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth();
  };

  const onChangeSignin = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setsignIn({ ...signIn, [name]: value });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          height: "60vh",
          maxWidth: "100%",
          width: { xs: "auto", sm: "600px", md: "1050px" },
        }}
      >
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={5}
              md={7}
              sx={{
                backgroundImage: `url(${BackImage})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[900]
                    : t.palette.grey[700],
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={7}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="usuario"
                    label="Usuario"
                    name="usuario"
                    autoComplete="usuario"
                    onChange={onChangeSignin}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangeSignin}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "info.light" }}
                  >
                    Ingresar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
