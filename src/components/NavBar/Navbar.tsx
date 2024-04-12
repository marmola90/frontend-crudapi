import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
//import Divider from "@mui/material/Divider";
//import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
//import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemButton from "@mui/material/ListItemButton";
//import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
//import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import { clearLocalStorage } from "@@utits";
import { resetUser } from "@/redux/states/user";
import { ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RutasPrivadas, RutasPublicas } from "@/models";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
//import LogoutIcon from "@mui/icons-material/Logout";

/*interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
// window?: () => Window;
//}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

//const drawerWidth = 240;

const Navbar = () => {
  // const { window } = props;
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const userState = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();

  /* const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };*/

  const logOut = () => {
    //clearLocalStorage(userKey);
    dispatch(resetUser());

    navigate(`${RutasPublicas.LOGIN}`, { replace: true });
  };
  return (
    <React.Fragment>
      <header>
        <Box sx={{ display: "flex" }}>
          <ThemeProvider theme={darkTheme}>
            <AppBar component="nav">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  //onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
                  {userState.token ? (
                    <Link to={RutasPrivadas.PRIVATE}>
                      <HomeIcon />
                    </Link>
                  ) : (
                    <Link to={RutasPublicas.LOGIN}>
                      <HomeIcon />
                    </Link>
                  )}
                </Box>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  {userState.token ? (
                    <Button sx={{ color: "#fff" }} onClick={logOut}>
                      LogOut
                    </Button>
                  ) : (
                    <Link to={RutasPublicas.LOGIN}>
                      <AccountCircleIcon />
                    </Link>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          </ThemeProvider>
          {/*  <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box> */}
        </Box>
      </header>
    </React.Fragment>
  );
};
export default Navbar;
