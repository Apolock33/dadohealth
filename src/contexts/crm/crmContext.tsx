import { createContext } from "react";
import { getUsers as fetchProfessionalList, getUserById, updateBlockUserStatus } from "../../services/crmService"

export const CRMContext = createContext<CRMContextType>(null!);

export const CRMProvider = ({ children }: any) => {

    const getProfessionalList = () => {
        return fetchProfessionalList();
    };

    const getPacientList = () => {
        return fetchProfessionalList();
    };

    const getProById = (id: string) => {
        return getUserById(id);
    }

    const getPacientById = (id: string) => {
        return getUserById(id);
    }

    const changeBlockStatus = (uid: string, blockStatus: boolean) => {
        const status = updateBlockUserStatus(uid, blockStatus);
        return status;
    }

    return (
        <CRMContext.Provider value={{
            getProfessionalList,
            getPacientList,
            changeBlockStatus, getProById, getPacientById
        }}>
            {children}
        </CRMContext.Provider>
    )
}