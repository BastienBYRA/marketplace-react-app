import React from 'react';
import logoCompagny from '../.././assets/logo_focus-removebg.png'
import './style.css'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useNavigate } from 'react-router-dom';

const Header = ({lightMode, emptyVariable}) => {

    const navigate = useNavigate();

    return (
        <header className='header'>
            {/* <img src={logoCompagny} alt="logo" className='header-logo' onClick={() => navigate("/")}/> */}
            <img src={logoCompagny} alt="logo" className='header-logo' onClick={() => {
                navigate("/");
                emptyVariable('DELETE_SEARCH_SPECIFIC_CATEGORY');
            }}/>
            {/* <input className='header-search' type="text"></input> */}
            <div className='header-button-container'>
                {/* <div className='header-button' onClick={() => console.log({lightMode})}>{lightMode === true ? <LightModeIcon /> : <DarkModeIcon />}</div> */}
                <div className='header-button' onClick={() =>
                    navigate("/basket")
                    }>
                    {/* <div className="header-basket-alert"></div> */}
                    <LocalGroceryStoreIcon />
                </div>
            </div>
        </header>
    )
}

export default Header