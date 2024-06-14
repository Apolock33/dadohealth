import { useContext, useEffect, useState } from 'react';
import '../../assets/css/crm.css';
import { CRMContext } from '../../contexts/crm/crmContext';
import { Button } from 'primereact/button';
import { FiEdit2, FiEye, FiPlus } from 'react-icons/fi';
import GeneralTable from '../../components/generalTable';
import GeneralCanva from '../../components/generalCanva';
import ProfesionalForm from '../../components/moduleComponents/crm/profesionalForm';
import { FaBan, FaUser } from 'react-icons/fa6';
import { Tag } from 'primereact/tag';
import BlockedProfessionals from '../../components/moduleComponents/crm/blockedProfessionals';
import { GlobalContext } from '../../contexts/global/globalContext';
import { classNames } from 'primereact/utils';
import { DataView } from 'primereact/dataview';

type User = {
    id: string;
    email: string;
    name: string;
    cpf: string;
    pic: string;
    userType: string;
    expertise: string;
    adm: boolean;
    concierge: boolean;
    blockUser: boolean;
    blockProntuary: boolean;
    blockFinances: boolean;
    blockDocumentation: boolean;
    blockEvolutions: boolean;
    blockDiary: boolean;
    identificationType: string;
    identificationNumber: string;
    identificationUF: string;
};

const CRM = () => {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [openBlock, setOpenBlock] = useState<boolean>(false);
    const [userList, setUserList] = useState<any[]>([]);
    const [blockedPros, setBlockedPros] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const { checkMobile, mobileOpen } = useContext(GlobalContext);
    const { getProfessionalList, changeBlockStatus, getProById } = useContext(CRMContext);

    const typeTemplate = (user: any) => {
        return (
            <Tag
                value={user.userType === '1' ? 'Profissional' : user.userType == 2 ? 'Administrativo' : 'ADM'}
                severity={(user.userType == 1 || user.userType === 2) ? null : 'danger'}
            />
        );
    };

    const handleGetEditInfo = (id: string) => {
        try {
            getProById(id)
                .then((res: any) => {
                    setSelectedUser(res);
                })
                .catch((error: any) => {
                    console.error('Error fetching user:', error);
                });
            setOpenEdit(true);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleBlockUserChange = (id: string) => {
        try {
            let blockUserStatus = false;
            getProById(id).then((proInfo: any) => {
                blockUserStatus = !proInfo.blockUser;
                changeBlockStatus(id, blockUserStatus);
                fetchData();
            });
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const actionsTemplate = (user: User) => {
        return (
            <div className="flex">
                <Button
                    tooltip='Editar Infos'
                    icon={<FiEdit2 size={25} />}
                    rounded
                    text
                    onClick={() => handleGetEditInfo(user.id)}
                />
                <Button
                    tooltip='Bloquear Profissional'
                    tooltipOptions={{ position: 'left' }}
                    icon={<FaBan size={25} />}
                    rounded
                    text
                    onClick={() => handleBlockUserChange(user.id)}
                />
            </div>
        );
    };

    const fetchData = async () => {
        try {
            const data = await getProfessionalList();
            const filteredData = data.filter((user: any) => !user?.blockUser && user?.userType !== '4');
            const filteredBlockedData = data.filter((user: any) => user?.blockUser);
            setBlockedPros(filteredBlockedData);
            setUserList(filteredData);
        } catch (error) {
            console.error('Error fetching professional list:', error);
        }
    };

    useEffect(() => {
        fetchData();
        checkMobile();
    }, []);

    let columns = [
        {
            name: 'Nome',
            field: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            field: 'email',
            sortable: true,
        },
        {
            name: 'Tipo',
            field: 'userType',
            sortable: true,
            body: (users: User) => typeTemplate(users),
        },
        {
            name: '',
            field: '',
            sortable: false,
            body: (user: User) => actionsTemplate(user),
        }
    ];

    const itemTemplate = (professional: User): JSX.Element => {
        return (
            <div className="col-12" key={professional.id}>
                <div className={classNames('flex xl:flex-row justify-content-center sm:align-items-center md:align-items-center lg:align-items-center xl:align-items-center p-2 gap-3', { ' surface-border': professional.id !== '1000' })}>
                    {professional?.pic ? (
                        <img className="w-5rem h-5rem block xl:block mx-auto border-circle" src={professional.pic} alt="User" />
                    ) : (
                        <FaUser className="w-5rem h-5rem block xl:block mx-auto border-circle" />
                    )}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{professional.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{professional.expertise}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button
                                tooltip='Ver Dados'
                                tooltipOptions={{ position: 'left' }}
                                icon={<FiEye />}
                                rounded
                                outlined
                                className=""
                                onClick={() => handleGetEditInfo(professional.id)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const headerTemplate = () => {
        return (
            <div className='flex justify-content-center align-items-center text-center gap-4'>
                <Button
                    tooltip='Profissionais Bloqueados'
                    className='border-primary'
                    icon={<FaBan size={25} />}
                    size="small"
                    outlined
                    rounded
                    onClick={() => setOpenBlock(!openBlock)}
                />
                <Button
                    tooltip='Adicionar Profissional'
                    className='border-primary'
                    icon={<FiPlus size={25} />}
                    size="small"
                    outlined
                    rounded
                    onClick={() => setOpenAdd(!openAdd)}
                />
            </div>
        )
    }

    return (
        <section className="card">
            <div className="flex flex-row align-items-center justify-content-between my-2">
                <div className='flex sm:text-center'>
                    <h1 className="text-6xl font-light title-color sm:text-center p-0">Cadastro de Profissionais</h1>
                </div>
                {mobileOpen ?
                    null
                    :
                    <div>
                        <Button
                            className="p-2 mr-3"
                            label={mobileOpen ? '' : "Profisisonais Bloqueados"}
                            rounded
                            icon={<FaBan className="mr-2" size={18} />}
                            size="small"
                            onClick={() => setOpenBlock(!openBlock)}
                        />
                        <Button
                            className="p-2"
                            label={mobileOpen ? '' : "Adicionar Profisisonal"}
                            rounded
                            icon={<FiPlus className="mr-2" size={18} />}
                            size="small"
                            onClick={() => setOpenAdd(!openAdd)}
                        />
                    </div>
                }
            </div>
            {mobileOpen ? (
                <DataView value={userList} layout="list" itemTemplate={itemTemplate} paginator rows={5} header={headerTemplate()} />
            ) : (
                <GeneralTable data={userList} columns={columns} exibitedRows={5} />
            )}

            <GeneralCanva
                header="Editar Informações"
                open={openEdit}
                onHide={() => setOpenEdit(false)}
                position="right"
                canvaColor="#1593A5 !important"
            >
                <ProfesionalForm closeForm={() => setOpenEdit(false)} {...(selectedUser || {})} />
            </GeneralCanva>

            <GeneralCanva
                open={openAdd}
                onHide={() => setOpenAdd(false)}
                position="right"
                header="Adicionar Profissional"
                canvaColor="#1593A5 !important"
            >
                <ProfesionalForm closeForm={() => setOpenAdd(false)} />
            </GeneralCanva>

            <GeneralCanva
                open={openBlock}
                onHide={() => setOpenBlock(!openBlock)}
                position="right"
                header="Profissionais Bloqueados"
                canvaColor="#1593A5 !important"
            >
                {blockedPros.map((blqPro: any) => (
                    <BlockedProfessionals key={blqPro.id} title={blqPro.name} status={blqPro.blockUser} onClick={() => handleBlockUserChange(blqPro.id)} />
                ))}
            </GeneralCanva>
        </section>
    );
};

export default CRM;
