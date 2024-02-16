import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../assets/leaveIcon.svg'
import menuIcon from '../assets/menuIcon.svg'
import homeIcon from '../assets/homeIcon.svg'
import userIcon from '../assets/userIcon.svg'
import documentsIcon from '../assets/documentsIcon.svg'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../hooks/index';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


export default function Header() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [showMenuUser, setShowMenuUser] = useState(false);
    const [showMenuDocuments, setShowMenuDocuments] = useState(false);
    const [showMenuStyle, setShowMenuStyle] = useState('headerAddons');
    const [buttonHomeStyle, setButtonHomeStyle] = useState('button-16-enable');
    const [buttonUserStyle, setButtonUserStyle] = useState('button-16-disable');
    const [buttonDocumentsStyle, setButtonDocumentsStyle] = useState('button-16-disable');
    const { signOut } = UseAuth()

    function returnLogin() {
        navigate('/login')
        signOut()
        console.log('deslogar')
    }

    function handleMenu() {
        if (showMenu == false) {
            setShowMenu(true)
            setShowMenuStyle('header-slide-down')
        } else if (showMenu == true) {
            setShowMenuStyle('header-slide-up')
            setTimeout(() => {
                setShowMenu(false);
            }, 500);
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if (path === '/home') {
            setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/client' || path === '/estagiario' || path === '/professor') {
            setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        } else if (path === '/processo' || path === '/relatorio' || path === '/professor') {
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        }
    }, [location.pathname]);

    function setButtonStyles(entry, exit, history) {
        setButtonHomeStyle(entry);
        setButtonUserStyle(exit);
        setButtonDocumentsStyle(history);
    }

    function buttonHomeClicked() {
        navigate('/home');
    }

    function buttonUserClicked() {
        setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        if (showMenuUser) {
            setShowMenuUser(false)
        } else {
            setShowMenuUser(true)
            console.log('mostrando')
        }
    }

    function buttonClientClicked() {
        navigate('/client');
        setShowMenuUser(false)
    }

    function buttonEstagiarioClicked() {
        navigate('/estagiario');
        setShowMenuUser(false)
    }

    function buttonProfessorClicked() {
        navigate('/professor');
        setShowMenuUser(false)
    }

    function buttonProcessClicked(){
        navigate('/processo');
        setShowMenuUser(false)
        setShowMenuDocuments(false)
    }

    function buttonRelatorioClicked(){
        navigate('/relatorio');
        setShowMenuUser(false)
        setShowMenuDocuments(false)
    }

    function buttonDocumentsClicked() {
        setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        if (showMenuDocuments) {
            setShowMenuDocuments(false)
        } else {
            setShowMenuDocuments(true)
        }
    }

    function spaceOutClicked() {
        if (showMenuUser || showMenuDocuments) {
            setShowMenuUser(false)
            setShowMenuDocuments(false)
        }
    }
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#F9F2DF',
            width: '112px',
            textAlign: 'center',
            border: '1px solid #04151C',
            color: '#5F4B42',
            boxShadow: theme.shadows[2],
            fontSize: 14,
            fontFamily: 'Inter',
            borderRadius: 5,
            fontWeight: 400,
            letterSpacing: '0.5px'
        },
    }));

    return (
        <Container>
            <div className="header">
                <div className='headerContainer'>
                    <button className='button-17' onClick={handleMenu}>
                        <img src={menuIcon} />
                    </button>
                    <div className="logoHeader"></div>
                </div>
                <LightTooltip title="Sair" placement="bottom" >
                    <button className='button-17' onClick={returnLogin}><img src={leaveIcon} /></button>
                </LightTooltip>
            </div>
            {showMenu && (
                <>
                    <div className={showMenuStyle}>
                        <LightTooltip title="Home" placement="right" >
                            <button className={buttonHomeStyle} onClick={buttonHomeClicked}><img src={homeIcon} /></button>
                        </LightTooltip>
                        <LightTooltip title="Pessoas" placement="right" >
                            <button className={buttonUserStyle} onClick={buttonUserClicked}><img src={userIcon} onClick={buttonUserClicked} /></button>
                        </LightTooltip>
                        <LightTooltip title="Atividades" placement="right" >
                            <button className={buttonDocumentsStyle} onClick={buttonDocumentsClicked}><img src={documentsIcon} /></button>
                        </LightTooltip>
                    </div>
                    {showMenuUser && (
                        <div className="showMenuContainer" onClick={spaceOutClicked}>
                            <div className="showMenuStyle">
                                <ul>
                                    <li><button onClick={buttonClientClicked}>Cliente</button></li>
                                    <li><button onClick={buttonEstagiarioClicked}>Estagiário</button></li>
                                    <li><button onClick={buttonProfessorClicked}>Professor</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {showMenuDocuments && (
                        <div className="showMenuContainer" onClick={spaceOutClicked}>
                            <div className="showMenuStyle">
                                <ul>
                                    <li><button onClick={buttonProcessClicked}>Processo</button></li>
                                    <li><button onClick={buttonRelatorioClicked}>Relatório</button></li>
                                    <li><button onClick={buttonProfessorClicked}>Atendimento</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}