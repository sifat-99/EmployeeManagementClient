import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Components/Provider/AuthProvider";
import useEmployee from "../../../Components/hooks/useEmployee";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Components/hooks/useAxiosPublic";


const HrPrivateRoute = ({ children }) => {
  const { user, loading, logOut,setLoading } = useContext(AuthContext);
  const [AllData, refetch] = useEmployee();
  const [currenEmployee, setCurrentEmployee] = useState('hr');

  // console.log(user)clg

  console.log(AllData)

  const axiosPublic = useAxiosPublic();

//   const [facedData, setFacedData] = useState([]);

  const { email } = user;
  console.log(email);

  useEffect(() => {
    const handleUser = async () => {
      const res = await AllData.find((item) => item.email === email);

      console.log(res.role)
      setCurrentEmployee(res.role);
    };
    handleUser();
  }, [email, AllData,setLoading, axiosPublic]);

  console.log(currenEmployee?.role);

  const location = useLocation();

  console.log(location.pathname);
  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center text-9xl mt-20">
          <span className="loading loading-bars loading-lg"></span>
        </div>
        <h2 className="flex justify-center items-center text-9xl mt-20">
          Please Wait.....
        </h2>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyItems: "center" }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

//   setLoading(false)

  if (currenEmployee === "hr") {
    // setLoading(false)
    return children;
  } else {

        const handleSwal  = async () => {
            if(currenEmployee === 'hr')
            {
                return children;
            }
            else
            {
             const res = await Swal.fire({
                title: 'You are not authorized to access this page',
                text: 'Please contact your admin',
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
              if(res.isConfirmed)
              {
                logOut();
                return <Navigate to={'/login'}></Navigate>
              }
        }
    }
        handleSwal();
    refetch();
  }
};

HrPrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HrPrivateRoute;
