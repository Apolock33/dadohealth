type CRMContextType = {
    getProfessionalList: () => Promise<Professional[]>;
    changeBlockStatus: (uid: string, blockStatus: boolean) => Promise<void>;
    getProById: (id: string) => Promise<Professional>;
    getPacientList: () => Promise<Pacient[]>;
    getPacientById: (id: string) => Promise<any>;
}
