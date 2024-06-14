type AuthContextType = {
    user: any;
    setUser: any;
    token: any;
    updateToken: (newToken: string) => void;
    updateUser: (newUser: string) => void;
    signIn: (form: { email: string; password: string; }) => Promise<any>;
    signOut: () => void;
    contextValue: any;
    createUser: any;
    sendPasswordRetrieveEmail: any
}