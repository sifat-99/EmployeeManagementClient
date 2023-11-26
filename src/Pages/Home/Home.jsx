import { Box, Typography } from "@mui/material";
import Banner from "../../Components/SharedComponents/Banner/Banner";
import WhatWeDo from "./WhatWeDo";
import Testimonial from "./Testimonal";

// import ToggleColorMode from "../../Components/Theme/ThemeProvider";

const Home = () => {
  return (
    <Box>
      {/* <ToggleColorMode></ToggleColorMode> */}
      <Banner></Banner>
      <Typography
        sx={{ textAlign: "center", fontSize: "48px", fontWeight: 700 }}
      >
        Services
      </Typography>

      <WhatWeDo></WhatWeDo>
      <Typography
        sx={{ textAlign: "center", fontSize: "32px", fontWeight: 700 }}
      >
        Testimonials
      </Typography>
      <Testimonial></Testimonial>
    </Box>
  );
};

export default Home;
