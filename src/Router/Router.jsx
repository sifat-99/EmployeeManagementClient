import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../User_Authentication/Login/Login";
import Registration from "../User_Authentication/Registration/Registration";

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
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/registration",
                element:<Registration></Registration>,
            },
        ],
    }
])

