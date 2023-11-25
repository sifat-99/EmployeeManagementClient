import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Components/Shared/Navbar/Navbar";
import { Box, Container } from "@mui/material";
import Footer from "../Components/SharedComponents/Footer/Footer";


const Root = () => {
  return (
    <Container>
      <Box>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Box>
      <Box>
        <Outlet></Outlet>
      </Box>
      <Footer></Footer>
    </Container>
  );
};

export default Root;
