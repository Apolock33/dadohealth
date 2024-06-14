import { createContext } from 'react';
import { deleteSchedule, getScheduleById, getScheduleList, postSchedule, putSchedule } from '../../services/scheduleServices';

export const SchedulingContext = createContext<SchedulingContextType>(null!);

export const SchedulingProvider = ({ children }: any) => {
    // const { userInfo, userType } = useContext(UserContext);

    const createSchedule = (id: string, form: any) => {
        const create = postSchedule(id, form);
        return create;
    };

    const readScheduleList = () => {
        const read = getScheduleList();
        return read;
    }

    const readScheduleById = (id: string) => {
        const read = getScheduleById(id);
        return read;
    }

    const updateSchedule = (id: string, form: any) => {
        const update = putSchedule(id, form);
        return update;
    }

    const removeSchedule = (id: string) => {
        const remove = deleteSchedule(id);
        return remove;
    }

    return <SchedulingContext.Provider value={{
        createSchedule,
        readScheduleList,
        readScheduleById,
        updateSchedule,
        removeSchedule
    }}>
        {children}
    </SchedulingContext.Provider>
}
