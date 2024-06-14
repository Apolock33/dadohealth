import { db } from "../firebase";
import { get, ref, set, update } from "firebase/database";

const getUserData = async (uid: any) => {
    const userRef = await ref(db, `users/${uid}`)
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log("No data available");
        return null;
    }
};

const getUserType = async (userType: string) => {
    const userTypeRef = ref(db, `/userTypes/${userType}`);
    const snapshot = await get(userTypeRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log("No data available");
        return null;
    }
};

const postUserdata = async (uid: string, data: any) => {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await set(userRef, data);
    return snapshot;
}

const updateUserdata = async (uid: string, data: any) => {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await update(userRef, data);
    return snapshot;
}

export { getUserData, getUserType, postUserdata, updateUserdata };