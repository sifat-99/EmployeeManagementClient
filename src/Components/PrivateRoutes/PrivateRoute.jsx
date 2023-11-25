import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from "../Provider/AuthProvider";



const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    const location = useLocation();
if(loading){
    return (
    <>
    <div className="flex justify-center items-center text-9xl mt-20"><span className="loading loading-bars loading-lg"></span></div>
    <h2 className="flex justify-center items-center text-9xl mt-20">Please Wait.....</h2>
    <Box sx={{ display: 'flex', alignItems:'center', justifyItems:'center' }}>
      <CircularProgress />
    </Box>
    </>

    ) 
}

    if(user){
        return children;
    }
    else
    {
       return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PrivateRoute;