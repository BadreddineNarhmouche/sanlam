import { NotFound } from '@reinsurance/shared';
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from '../pages/AppLayout';
import { PAGES } from './navigation';
import QuittanceDetailsPage from '../pages/QuittanceDetailsPage';
import DemandeDetailsPage from '../pages/DemandeDetailsPage';

const Home = React.lazy(() => import('../pages/HomePage'));
const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
const HelpPage = React.lazy(() => import('../pages/HelpPage'));

export const ROUTES: RouteObject[] = [
    {
        path: PAGES.HOME,
        element: <AppLayout />,
        children: [
            {
                path: '',
                children: [
                    { path: '', element: <Home /> },
                ],
            },
            {
                path: PAGES.DEMANDS,
                element: <DashboardPage />,
            },
            {
                path: PAGES.DEMANDS_PRODUCER,
                element: <DashboardPage />,
            },
            {
                path: PAGES.QUITTANCE_DETAILS,
                element: <QuittanceDetailsPage />,
            },
            {
                path: PAGES.DEMANDS_DETAILS,
                element: <DemandeDetailsPage />,
            },
            {
                path: PAGES.HELP,
                element: <HelpPage />,
            },
            {
                path: PAGES.NOT_FOUND,
                element: <NotFound />
            },
        ],
    },
];
