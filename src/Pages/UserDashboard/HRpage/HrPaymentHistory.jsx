import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const HrPaymentHistory = () => {
  const axiosPublic = useAxiosPublic();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosPublic.get('/pay/get').then((res) => {
      console.log(res.data);
      setPayments(res.data);
    });
  }
  ,[axiosPublic])

  console.log(payments)

  return <div style={{maxWidth:'90%', margin:'auto'}}>


<TableContainer component={Paper}>
      <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">transaction ID</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.transactionId}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  </div>;
};

export default HrPaymentHistory;
