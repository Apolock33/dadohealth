import { createContext, useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import { getIn, getOut, postNewUser, retrievePassword } from "../../services/authService";
import { auth } from "../../firebase";
import { redirect } from "react-router-dom";
import Cookie from 'js-cookie';

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(sessionStorage.getItem('token')?.toString());

    const updateToken = (newToken: string) => {
        setToken(newToken);
    };

    const updateUser = (newUser: string) => {
        setUser(newUser);
    };

    const signIn = (form: { email: string; password: string; }) => {
        const response = getIn(auth, form.email, form.password);
        return response;
    }

    const signOut = () => {
        const response = getOut(auth);
        Cookie.remove('user');
        Cookie.remove('userInfo');
        Cookie.remove('userType');
        Cookie.remove('token');
        sessionStorage.clear();
        setUser({});
        setToken('');
        api.defaults.headers.common['Authorization'] = null;
        redirect(`/`);
        return response;
    }

    const createUser = (email: string, password: string) => {
        const user = postNewUser(email, password);
        return user;
    }

    const sendPasswordRetrieveEmail = (email: string) => {
        const response = retrievePassword(email);
        return response;
    }

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            Cookie.set('token', token, { path: '/' });
            sessionStorage.setItem('token', token);
        }
        else {
            delete api.defaults.headers.common['Authorization'];
            Cookie.remove('token');
            sessionStorage.removeItem('token');
        }
    }, [token, user]);

    const contextValue = useMemo(() => ({ token, updateToken, updateUser }), [token, user]);

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, updateToken, signIn, signOut, contextValue, token, createUser, sendPasswordRetrieveEmail }}>
            {children}
        </AuthContext.Provider>
    );
}