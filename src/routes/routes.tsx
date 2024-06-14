import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import PacientCRM from '../pages/pacients';
import ProfessionalCRM from '../pages/professionalsList';
import PacientCRMAdd from '../pages/pacients/pacientCrmAdd';
import Login from '../pages/login';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/authContext';
import { RequireAuth } from './requireAuth';
import ResetPassword from '../pages/resetPassword';
import ErrorComponent from '../pages/error';
import Scheduling from '../pages/scheduling';

const Routes = () => {

    const { token } = useContext(AuthContext);

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/retrieve-password',
            element: <ResetPassword />
        }
    ];

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <RequireAuth />,
            children: [
                {
                    path: 'pacients',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <PacientCRM />
                        },
                        {
                            path: 'add',
                            element: <PacientCRMAdd />
                        },
                        {
                            path: ':id',
                            element: <PacientCRMAdd />
                        }
                    ]
                },
                {
                    path: 'schedule',
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Scheduling />
                        }
                    ]
                },
                {
                    path: 'professionals-list',
                    element: <ProfessionalCRM />
                }
            ],
            errorElement: <ErrorComponent />
        }
    ];

    const RouteList: any = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ]);

    return <RouterProvider router={RouteList} />;
}


export { Routes };