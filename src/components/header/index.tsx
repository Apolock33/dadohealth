import '../../assets/css/header.css';
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/global/globalContext";
import ImgLogo from '../../assets/imgs/blue2 logo.svg';
import ImgLogoDark from '../../assets/imgs/white logo.svg';
import UserAvatar from "../userAvatar";
import { Button } from "primereact/button";
import { FaBars, FaBookMedical, FaMoneyBillWave, FaUserDoctor } from "react-icons/fa6";
import GeneralCanva from '../generalCanva';
import { GoHomeFill } from 'react-icons/go';
import { HiDocumentReport } from 'react-icons/hi';

const Header = ({ children }: any) => {
    const {
        scrolled,
        mobileOpen
    } = useContext(GlobalContext);

    const [openLinks, setOpenLinks] = useState(false);

    const navLinks = [
        {
            id: 1,
            label: "Home",
            path: "/",
            icon: <GoHomeFill size={20} className={`${scrolled ? 'text-white transition-duration-500':'text-primary'}`} />
        },
        {
            id: 2,
            label: "Pacientes",
            path: "/pacients",
            icon: <FaUserDoctor size={20} className={`${scrolled ? 'text-white transition-duration-500':'text-primary'}`} />
        },
        ,
        {
            id: 32,
            label: "Agenda",
            path: "/schedule",
            icon: <FaBookMedical size={20} className={`${scrolled ? 'text-white transition-duration-500':'text-primary'}`} />
        },
        {
            id: 4,
            label: "Financeiro",
            path: "/finances",
            icon: <FaMoneyBillWave size={20} className={`${scrolled ? 'text-white transition-duration-500':'text-primary'}`} />
        },
        {
            id: 5,
            label: "Relatórios",
            path: "/reports",
            icon: <HiDocumentReport size={20} className={`${scrolled ? 'text-white transition-duration-500':'text-primary'}`} />
        }
    ];

    return (
        <React.Fragment>
            <header className={`wrapper top-0 px-5 flex align-items-center justify-content-between border-primary ${scrolled ? 'bg-primary text-white transition-duration-500' : ''}`}>
                <Link to="/">
                    {scrolled ?
                        <img src={ImgLogoDark} alt="Logo" width="180" color='#1593A5' className='my-3'/>
                        :
                        <img src={ImgLogo} alt="Logo" width={`${mobileOpen? "140":"180"}`} className='my-3'/>}
                </Link>
                {mobileOpen ? null :
                    <nav className="flex align-items-center justify-content-center">
                        {navLinks.map((link: any) => (
                            <Button link key={link.id} icon={link.icon} className="flex align-items-center p-2 font-light">
                                <Link className={`navlinks ${scrolled ? 'text-white transition-duration-500 ml-2 font-light' : 'text-primary ml-2 font-light'}`} to={link.path}>{link.label}</Link>
                            </Button>
                        ))}
                    </nav>
                }
                <div className="flex align-items-center">
                    {mobileOpen ?
                        <Button
                            rounded
                            text
                            className={`p-2 ${scrolled ? 'text-white transition-duration-500' : 'text-primary'}`}
                            onClick={() => setOpenLinks(!openLinks)}
                        >
                            <FaBars size={20} />
                        </Button> :
                        null}
                    <UserAvatar />
                </div>
            </header>
            <div className='p-5 mt-5'>
                {children}
            </div>
            <GeneralCanva
                header='Links'
                open={openLinks}
                onHide={() => setOpenLinks(false)}
                position="right"
                canvaColor="#1593A5 !important">
                {navLinks.map((link: any) => (
                    <Button text key={link.id} icon={link.icon} className="flex align-items-center p-2 w-12 justify-content-center my-3">
                        <Link className="navlinks text-primary ml-2" to={link.path} onClick={() => setOpenLinks(!openLinks)}>{link.label}</Link>
                    </Button>
                ))}
            </GeneralCanva>
        </React.Fragment>
    );
}

export default Header;
