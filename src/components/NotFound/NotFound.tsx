import { Container } from "@mui/material";
import BackImage from "@/assets/pngwing.com.png";
const NotFound = () => {
  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        maxWidth: "100%",
        width: { xs: "400px", sm: "600px", md: "1050px" },
        backgroundImage: `url(${BackImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></Container>
  );
};
export default NotFound;
