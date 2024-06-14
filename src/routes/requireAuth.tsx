import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/authContext';
import { useContext } from 'react';
import Header from '../components/header';

export const RequireAuth = () => {
    const { token, user } = useContext(AuthContext);

    // Check if the user is authenticated
    if (!token || !user) {
        return <Navigate to="/" />;
    }

    return (
        <Header>
            <Outlet />
        </Header>
    )
};