import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";

const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
// const Concert = Loadable(lazy(() => import("../pages/concert")));
const ConcertCreate = Loadable(lazy(() => import("../pages/concert/create")));
// const ConcertEdit = Loadable(lazy(() => import("../pages/concert/edit")));
const PerformanceCreate = Loadable(lazy(() => import("../pages/concert/perform")));
const SeatChartCreate = Loadable(lazy(() => import("../pages/concert/seat")));
const AdminRoutes = (isLoggedIn : boolean): RouteObject => {

  return {

    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    
    children: [

      {

        path: "/",

        element: <Dashboard />,

      },

      {

        path: "/concert",

        children: [

          // {

          //   path: "/concert",

          //   element: <Concert />,

          // },

          {

            path: "/concert/create",

            element: <ConcertCreate />,

          },

          // {

          //   path: "/concert/edit",

          //   element: <ConcertEdit />,

          // },

          {

            path: "/concert/perform",

            element: <PerformanceCreate />,

          },

          {

            path: "/concert/seat",

            element: <SeatChartCreate />,

          },

        ],

      },

    ],

  };

};


export default AdminRoutes;