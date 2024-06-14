import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { getUserData, getUserType, postUserdata, updateUserdata } from "../../services/userService";
import { auth } from "../../firebase";
import Cookie from "js-cookie";

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState<User>();
    const [userType, setUserType] = useState<userType>();

    const postUser = (uid: any, userData: any) => {
        const post = postUserdata(uid, userData);
        return post;
    }

    const updateUser = (uid: any, userData: any) => {
        const updt = updateUserdata(uid, userData);
        return updt;
    }

    const getFirebaseUserInfo = async (): Promise<any> => {
        if (auth.currentUser == null) {
            const userCookie = Cookie.get("user");
            if (userCookie) {
                return JSON.parse(userCookie);
            }
        } else {
            return getCurrentUser();
        }
    }

    const getUserDbInfo = async (uid: string) => {
        const user = await getUserData(uid)
        return user;
    }

    const getUType = (uType: string) => {
        const userType = getUserType(uType);
        return userType;
    }

    const preserveUserInfo = async () => {
        try {
            const user = await getFirebaseUserInfo().then(async (userInfo) => {
                if (userInfo.uid) {
                    const info = await getUserDbInfo(userInfo.uid);
                    await setUserInfo(info);
                    const type = await getUType(info.userType);
                    await setUserType(type);
                    return userInfo.user;
                }
            });
            return user;
        } catch (error) {
            console.error("Error persisting user info:", error);
        }
    }

    useEffect(() => {
        if (Cookie.get('user')) {
            preserveUserInfo();
        }
    }, []);

    return (
        <UserContext.Provider value={{ userInfo, userType, setUserInfo, setUserType, postUser, updateUser, preserveUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}