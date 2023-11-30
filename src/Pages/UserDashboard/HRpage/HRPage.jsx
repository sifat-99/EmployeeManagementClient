import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead, Typography } from "@mui/material";
import {  useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";
import PaymentPage from "./Payment";
import Swal from "sweetalert2";
import useEmployee from "../../../Components/hooks/useEmployee";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function HrPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [AllData, refetch] = useEmployee();

  // const [data, setData] = useState([]);
  const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   axiosPublic
  //     .get("/employees")
  //     .then((res) => {
  //       const allUsers = res.data.filter((user) => user.role === "user");
  //       setData(allUsers);
  //     })
  //     .catch((err) => console.log(err));
  // }, [axiosPublic]);

  const data = AllData.filter((user) => user.role === "user");
  console.log(data);

  // console.log(data)

  const rows = data.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));

  // console.log(rows);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerification = (row) => {

    console.log(row.verificationStatus);
    axiosPublic.put(`/employees/${row.uid}`, {
        verificationStatus: !row.verificationStatus,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Verification Status Updated",
            showConfirmButton: true,
            timer: 1500,
          });
          refetch()
        }
      });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: "64px" }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 2,
          mb: 2,
          textDecoration: "underline",
          fontWeight: 700,
        }}
      >
        Employee List
      </Typography>

      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell style={{ width: 160 }} align="left">
              Email
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell style={{ width: 160 }} align="left">
              Bank Account
            </TableCell>

            <TableCell style={{ width: 160 }} align="center">
              Salary
            </TableCell>
            <TableCell style={{ width: 160 }} align="left">
              Payment
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {"    "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.email}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell style={{ width: "auto" }} align="left">
                {row.email}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleVerification(row)}
                  sx={{
                    backgroundColor: row.verificationStatus ? "green" : "red",
                  }}
                >
                  {row.verificationStatus ? <CheckIcon /> : <CancelIcon />}
                </Button>
              </TableCell>
              <TableCell style={{ width: "auto" }} align="left">
                {row.id}
              </TableCell>
              <TableCell style={{ width: "auto" }} align="center">
                {row.salary}
              </TableCell>
              <TableCell>
                <div>
                  <PaymentPage user={row}></PaymentPage>
                </div>
              </TableCell>
              <TableCell>
                {/* <Link to={`/dashboard/${row.email}`}>
                  <Button variant="contained" color="primary">
                    Details
                  </Button>
                </Link> */}
                <Link to={`/dashboard/${row.email}`}>details</Link>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={4} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
