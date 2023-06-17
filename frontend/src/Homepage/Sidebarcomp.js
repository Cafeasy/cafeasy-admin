import React, { useState } from 'react';
import "../Homepage/Sidebarpage.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Sidebardata } from './Sidebardata';
import logodannama from '../Photos/logodannama.png';
import '../Photos/logodannama.png';
import { IconContext } from 'react-icons';

function Sidebarcomp () {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
              <li className='navbar-toggle'>  
                <Link to='#' className='menu-bars'>
                <img src={logodannama} alt="Logo" />
                </Link>
              </li>
              <br></br>
              {Sidebardata.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
    );
  }

export default Sidebarcomp;