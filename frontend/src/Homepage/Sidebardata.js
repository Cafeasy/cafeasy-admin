import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const Sidebardata = [
  {
    title: 'Data Menu',
    path: '/DataMenu',
    icon: <FaIcons.FaUserEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Data Transaksi',
    path: '/DataTransaksi',
    icon: <RiIcons.RiFileUploadFill />,
    cName: 'nav-text'
  },
  {
    title: 'Data Pelanggan',
    path: '/DataPelanggan',
    icon: <MdIcons.MdOutlineInventory />,
    cName: 'nav-text'
  },
  {
    title: 'Data Riwayat Transaksi',
    path: '/DataRiwayat',
    icon: <MdIcons.MdOutlineInventory />,
    cName: 'nav-text'
  },
];