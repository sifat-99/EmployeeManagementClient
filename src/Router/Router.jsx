import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../User_Authentication/Login/Login";
import Registration from "../User_Authentication/Registration/Registration";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoute";
import AdminDashboard from "../Components/Dashboards/AdminDashboard";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <PrivateRoute><Home></Home></PrivateRoute>,
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
                path: "/dashboard",
                element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
            },
            {
                path: "contact us",
                element: <h1>Contact Us</h1>,
            }
        ],
    }
])

