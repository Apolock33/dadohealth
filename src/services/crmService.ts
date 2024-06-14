import { db } from "../firebase";
import { ref, onValue, update, get } from "firebase/database";


const getUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const userList: User[] = data ? Object.values(data) as User[] : [];
            resolve(userList);
        }, (error) => {
            reject(error);
        });
    });
};

const getUserById = async (id: string) => {
    const userRef = ref(db, `users/${id}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log("No data available");
        return null;
    }
};

const updateBlockUserStatus = async (uid: string, blockStatus: boolean) => {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await update(userRef, { blockUser: blockStatus });
    return snapshot;
}

export { getUsers, updateBlockUserStatus, getUserById }