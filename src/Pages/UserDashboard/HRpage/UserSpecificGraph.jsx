import { Box, Container, LinearProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import PropTypes from "prop-types";

export default function UserChart({ salary, month }) {
  console.log(salary);
  console.log(month);

  return (
    <Container maxWidth={'lg'}>
      {
        salary.length>0?(
          <BarChart
            xAxis={
              month && [
                {
                  id: "barCategories",
                  data: month,
                  scaleType: "band",
                },
              ]
            }
            series={
              salary && [
                {
                  data: salary,
                },
              ]
            }
            width={800}
            height={300}
            
          />
        ):<Box sx={{ width: '100%' }}>
            Please Wait, Loading...
        <LinearProgress />
      </Box>
        
        
      }
    </Container>
  );
}

UserChart.propTypes = {
  payments: PropTypes.array.isRequired,
    month: PropTypes.array.isRequired,
    salary: PropTypes.array.isRequired,

};
