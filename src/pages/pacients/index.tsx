import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useContext, useEffect, useState } from 'react';
import '../../assets/css/dataViewer.css'
import { FiEye, FiPlus } from 'react-icons/fi';
import { CRMContext } from '../../contexts/crm/crmContext';
import { FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/global/globalContext';
import FastSchedule from '../../components/moduleComponents/scheduling/fastSchedule';

const PacientCrm = () => {
    const [pacientList, setPacientList] = useState<Pacient[]>([]);
    const navigate = useNavigate();

    const {
        mobileOpen
    } = useContext(GlobalContext);

    const {
        getPacientList
    } = useContext(CRMContext);

    const fetchData = async () => {
        try {
            const data = await getPacientList();
            const filteredData = data.filter((user: any) => user?.userType === '4');
            setPacientList(filteredData);
        } catch (error) {
            console.error('Error fetching professional list:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const itemTemplate = (pacient: Pacient): JSX.Element => {
        return (
            <div className="w-full" key={pacient.id}>
                <div className={classNames('flex flex-column md:flex-row lg:flex-row xl:flex-row d xl:align-items-center p-2 gap-3', { ' surface-border': pacient.id !== '1000' })}>
                    <img className="w-5rem h-5rem block xl:block mx-auto border-circle" src={`${(pacient?.pic == '') ? <FaUser /> : pacient?.pic}`} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900 text-primary">{pacient.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold text-primary">{pacient.expertise}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button tooltip='Ver Informações' tooltipOptions={{ position: 'left' }} icon={<FiEye />} text className="p-button-rounded border-primary" onClick={() => navigate(`/pacients/${pacient.id}`)}>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section>
            <div className='flex flex-column mt-4'>
                <div className={`flex ${mobileOpen ? 'flex-column justify-content-center align-items-center row-gap-3' : 'justify-content-between align-items-center'}`}>
                    <div className={`${mobileOpen ? 'text-center' : ''}`}>
                        <h1 className='text-6xl font-light title-color text-primary' style={{ margin: '0 0' }}>Pacientes</h1>
                    </div>
                    <div>
                        <Button rounded icon={<FiPlus size={20} className='mr-2' />} label='Adicionar Paciente' onClick={() => navigate(`/pacients/add`)} />
                    </div>
                </div>
                <div className={`flex flex-row justify-content-between gap-5 ${mobileOpen ? 'flex-column justify-content-center text-center' : ''}`}>
                    <div className="mt-3 card max-w-30rem">
                        <div>
                            <h3 className='text-2xl font-light text-primary'>Agendar Consulta</h3>
                        </div>
                        <FastSchedule />
                    </div>
                    <div className="mt-3">
                        <div>
                            <h3 className='text-2xl font-light text-primary'>Lista de Pacientes</h3>
                        </div>
                        <DataView value={pacientList} layout="list" itemTemplate={itemTemplate} paginator rows={3} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PacientCrm;
