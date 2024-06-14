type UserContextType = {
    userInfo: any;
    userType: any;
    setUserInfo: any;
    setUserType: any;
    postUser: (uid: any, userData: any) => Promise<void>;
    updateUser: (uid: any, userData: any) => Promise<void>;
    preserveUserInfo: () => void;
}
