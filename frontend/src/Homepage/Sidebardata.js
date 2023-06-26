import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as BiIcons from 'react-icons/bi';

export const Sidebardata = [
  {
    title: 'Profile Admin',
    path: '/ProfileAdmin/:idAdmin',
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
    icon: <HiIcons.HiUserGroup />,
    cName: 'nav-text'
  },
  {
    title: 'Data Kategori',
    path: '/DataKategori',
    icon: <BiIcons.BiCategory />,
    cName: 'nav-text'
  }
];