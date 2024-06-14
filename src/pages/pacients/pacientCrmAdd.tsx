import { useContext, useEffect, useState } from "react";
import { CRMContext } from "../../contexts/crm/crmContext";
import { useParams } from "react-router-dom";
import PacientCRMAddForm from "../../components/moduleComponents/crm/pacientForm";

const PacientCRMAdd = () => {
    const { id } = useParams();
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const { getPacientById } = useContext(CRMContext);

    const handleGetEditInfo = async (id: string) => {
        await setLoading(true);
        try {
            const res = await getPacientById(id);
            console.log('Fetched user:', res);
            await setSelectedUser(res);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            await setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof id === 'string') {
            handleGetEditInfo(id);
        }
    }, [id, getPacientById]);

    const FormPacient = () => {
        return (
            <PacientCRMAddForm {...selectedUser || {}} />
        );
    }

    return (
        <section className='flex flex-column xl:justify-content-center xl:align-items-start sm:justify-content-center sm:align-items-center md:justify-content-center md:align-items-center sm:text-center'>
            <div>
                <h1 className='text-6xl font-light title-color p-0 text-primary'>{(id === undefined) ? 'Cadastro de Novo Paciente' : 'Dados do Paciente'}</h1>
            </div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <FormPacient />
                )}
            </div>
        </section>
    );
};

export default PacientCRMAdd;