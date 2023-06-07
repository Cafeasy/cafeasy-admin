import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const Sidebardata = [
  {
    title: 'Kelola Fitur',
    path: '/',
    icon: <FaIcons.FaUserEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Update Pembukuan',
    path: '/pembukuan',
    icon: <RiIcons.RiFileUploadFill />,
    cName: 'nav-text'
  },
  {
    title: 'Update Persediaan',
    path: '/dsds',
    icon: <MdIcons.MdOutlineInventory />,
    cName: 'nav-text'
  },
];