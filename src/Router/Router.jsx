import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../User_Authentication/Login/Login";
import Registration from "../User_Authentication/Registration/Registration";
import PrivateRoute from "../Components/PrivateRoutes/PrivateRoute";
import Page from "../Pages/ErrorPage/Error";
import Dashboard from "../Pages/UserDashboard/Dashboard";
import AdminPage from "../Pages/UserDashboard/AdminPages/AdminPage";
import HrPage from "../Pages/UserDashboard/HRpage/HRPage";
import HR_SpecificUserDetails from "../Pages/UserDashboard/HRpage/HR_SpecificUserDetails";
import UserForm from "../Pages/UserDashboard/UserPages/UserWorkSheet";
import HrPaymentHistory from "../Pages/UserDashboard/HRpage/HrPaymentHistory";
import AdminPrivateRoute from "../Pages/UserDashboard/AdminPages/AdminPrivateRoute";
import HrPrivateRoute from "../Pages/UserDashboard/HRpage/HrPrivatePage";


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

            // Admin routes

            {
                path: 'admin-home',
                element:<AdminPrivateRoute><AdminPage></AdminPage></AdminPrivateRoute>
            },
            {
                path: 'admin-profile',
                element:<AdminPrivateRoute><h1>Admin Profile</h1></AdminPrivateRoute>
            },

            // user Routes
            {
                path: 'user-home',
                element:<h1>User Home</h1>
            },
            {
                path: 'user-profile',
                element:<h1>User Profile</h1>
            },
            {
                path: 'user-payment history',
                element:<h1>Payment History</h1>
            },
            {
                path: 'work sheet',
                element:<UserForm></UserForm>
            },
            
            // HR-Routes
            {
                path: 'hr-home',
                element:<HrPrivateRoute><HrPage></HrPage></HrPrivateRoute>
            },
            {
                path: ':email',
                element:<HrPrivateRoute><HR_SpecificUserDetails></HR_SpecificUserDetails></HrPrivateRoute>,
                loader: ({params})=>{
                        return params.email;
                }
            },
            {
                path: 'hr-payment history',
                element:<HrPrivateRoute><HrPaymentHistory></HrPaymentHistory></HrPrivateRoute>
            },

        ]
    }
])

