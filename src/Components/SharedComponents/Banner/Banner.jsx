import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Banner() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("ImageBanner.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // Check if data is empty or activeStep is out of bounds
  if (maxSteps === 0 || activeStep < 0 || activeStep >= maxSteps) {
    return null; // or handle this case appropriately
  }

  return (
    <Box sx={{ maxWidth: "100vh", flexGrow: 1, px: 2 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        {/* Check if data[activeStep] exists before accessing its properties */}
        <Typography>{data[activeStep]?.label}</Typography>
      </Paper>

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 && (
              <Container
                sx={{
                  height: "50vh",
                  display: "block",
                  maxWidth: "100%",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${step.imgPath})`,
                    height: "100%",
                    opacity: 1,
                  }}
                >
                  <Container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundImage: `url(${step.imgPath})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundColor: "black",
                      opacity: 1,
                      height: "100%",
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {/* You can render additional components here */}
                    {/* <Typography
                      sx={{
                        background: "black",
                        fontSize: 32,
                        fontWeight: 600,
                        p: 4,
                      }}
                    >
                      {step.label}
                    </Typography> */}
                  </Container>
                </Box>
              </Container>
            )}
          </div>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

// ...

export default Banner;
