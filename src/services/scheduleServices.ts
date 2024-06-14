import { get, onValue, ref, remove, set, update } from 'firebase/database';
import {  db } from '../firebase';

const postSchedule = async (uid: string, form: any) => {
    const scheduleRef = ref(db, `schedules/${uid}`);
    const snapshot = await set(scheduleRef, form);
    return snapshot;
}

const getScheduleList = () => {
    return new Promise((resolve, reject) => {
        const scheduleRef = ref(db, 'schedules/');
        onValue(scheduleRef, (snapshot) => {
            const data = snapshot.val();
            const scheduleList: Schedule[] = data ? Object.values(data) as Schedule[] : [];
            resolve(scheduleList);
        }, (error) => {
            reject(error);
        });
    });
}

const getScheduleById = async (id: string) => {
    const scheduleRef = ref(db, `schedules/${id}`);
    const snapshot = await get(scheduleRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log("No data available");
        return null;
    }
}

const putSchedule = async (uid: string, form: any) => {
    const scheduleRef = ref(db, `schedules/${uid}`);
    const snapshot = await update(scheduleRef, form);
    return snapshot;
}

const deleteSchedule = async (id: string) => {
    const scheduleRef = ref(db, `schedules/${id}`);
    const snapshot = await remove(scheduleRef);
    return snapshot;
}

export { postSchedule, getScheduleList, getScheduleById, putSchedule, deleteSchedule };