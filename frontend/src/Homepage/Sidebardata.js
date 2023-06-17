import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

export const Sidebardata = [
  {
    title: 'Profile Admin',
    path: '/ProfileAdmin',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Data Menu',
    path: '/DataMenu',
    icon: <MdIcons.MdMenuBook />,
    cName: 'nav-text'
  },
  {
    title: 'Data Transaksi',
    path: '/DataTransaksi',
    icon: <AiIcons.AiOutlineTransaction />,
    cName: 'nav-text'
  },
  {
    title: 'Data Pelanggan',
    path: '/DataPelanggan',
    icon: <AiIcons.AiFillCustomerService />,
    cName: 'nav-text'
  }
];