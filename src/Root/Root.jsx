import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Components/Shared/Navbar/Navbar";
import { Box, Container } from "@mui/material";


const Root = () => {
  return (
    <Container>
      <Box>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Box>
      <Box>
        <Outlet></Outlet>
      </Box>
    </Container>
  );
};

export default Root;
