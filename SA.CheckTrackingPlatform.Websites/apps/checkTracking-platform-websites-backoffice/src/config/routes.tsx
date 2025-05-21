import { NotFound } from "@checkTracking/shared";
import React from "react";
import { RouteObject } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import { PAGES } from "./navigation";

const Home = React.lazy(() => import("../pages/HomePage"));
const HelpPage = React.lazy(() => import("../pages/HelpPage"));
const DetailsCheck = React.lazy(() => import("../pages/DetailsCheck"));
const TreatmentPage = React.lazy(() => import("../pages/Treatment"));

export const ROUTES: RouteObject[] = [
  {
    path: PAGES.HOME,
    element: <AppLayout />,
    children: [
      {
        path: "",
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: PAGES.DETAILS_CHECK,
        element: <DetailsCheck />,
      },
      {
        path: PAGES.TREATMENT_CHECK,
        element: <TreatmentPage />,
      },
      {
        path: PAGES.HELP,
        element: <HelpPage />,
      },
      {
        path: PAGES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
];
