import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../User_Authentication/Login/Login";
import Registration from "../User_Authentication/Registration/Registration";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoute";
import Page from "../Pages/ErrorPage/Error";
import Dashboard from "../Pages/UserDashboard/Dashboard";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<Page></Page>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element:<Registration></Registration>,
            },
            {
                path: "contact us",
                element: <h1>Contact Us</h1>,
            }
        ],
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path: 'home',
                element:<h1>Home</h1>
            },
            {
                path: 'profile',
                element:<h1>Profile</h1>
            },
            {
                path: 'payment history',
                element:<h1>Payment History</h1>
            },
            {
                path: 'appointment',
                element:<h1>Appointment</h1>
            }
        ]
    }
])

