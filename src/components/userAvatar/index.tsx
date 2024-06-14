import { useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/global/globalContext';
import { UserContext } from '../../contexts/user/userContext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { AuthContext } from '../../contexts/auth/authContext';
import GeneralCanva from '../generalCanva';
import React from 'react';
import { Divider } from 'primereact/divider';
import { FiLogOut } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const UserAvatar = () => {
    const {
        signOut
    } = useContext(AuthContext)

    const {
        userInfo,
    } = useContext(UserContext);

    const {
        mobileOpen,
        scrolled
    } = useContext(GlobalContext);

    const navigate = useNavigate();
    const [openProfileCanva, setOpenProfileCanva] = useState(false);

    const toggleDrawer = (newOpen: any) => () => {
        setOpenProfileCanva(!newOpen);
    };

    const profileLinks = [
        {
            id: 1,
            label: "Configurar Conta",
            path: "/account-config"
        },
        {
            id: 2,
            label: "Liberar Prontuários",
            path: "/account-config"
        },
        {
            id: 3,
            label: "Lista de Profissionais",
            path: "/professionals-list"
        },
        {
            id: 4,
            label: "Configurações do Site",
            path: "/account-config"
        }
    ];

    return (
        <React.Fragment>
            <Button text rounded={mobileOpen} iconPos='right' icon={<Avatar className={mobileOpen ? '' : 'mx-2'} image={userInfo?.pic} icon={<FaUser />} shape="circle" size='normal' />} onClick={() => setOpenProfileCanva(!openProfileCanva)} className={`${scrolled ? 'text-white' : 'text-primary'} py-2`} label={`${(mobileOpen) ? '' : 'Ola, ' + userInfo?.name}`} />
            <GeneralCanva open={openProfileCanva} onHide={toggleDrawer(openProfileCanva)} position={'right'}>
                <div className='flex flex-column align-items-center'>
                    <Avatar image={(userInfo?.pic !== '') ? userInfo?.pic : null} icon={<FaUser className={`${scrolled ? 'text-primary' : ''}`} />} shape="circle" size='xlarge' />
                    <h2 className='m-3'>{userInfo?.name}</h2>
                    <p className='m-2'>{userInfo?.email}</p>
                </div>
                <div className='py-1'>
                    {profileLinks.map((link: any) => (
                        <Button key={link.id} link className='col-12 flex justify-content-center py-1 my-4' onClick={() => navigate(link.path)}>
                            {link.label}
                        </Button>
                    ))}
                </div>
                <div className='flex flex-column align-items-end justify-content-end'>
                    <Divider className='pt-2 pb-1' />
                    <Button className='p-2 col-12 flex justify-content-center signOut-button' outlined onClick={signOut}>
                        <FiLogOut className='mr-2' />
                        Sair
                    </Button>
                </div>
            </GeneralCanva>
        </React.Fragment>
    )
}

export default UserAvatar;