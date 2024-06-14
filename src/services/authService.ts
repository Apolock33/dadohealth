import { Auth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const postNewUser = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const getIn = (auth: Auth, email: string, password: string) => {
    const response = signInWithEmailAndPassword(auth, email, password);
    return response;
}

const getCurrentUser = () => {
    const userinfo = auth.currentUser;
    return userinfo;
}

const getOut = (auth: Auth) => {
    return signOut(auth);
}

const retrievePassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

export { getIn, getOut, getCurrentUser, postNewUser, retrievePassword };