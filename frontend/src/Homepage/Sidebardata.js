import React from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
export const Sidebardata = [
    {
        title: "Kelola Fitur",
        icon: <ManageAccountsIcon />,
        link: "/kelolafitur",
    },
    {
        title: "Update Pembukuan",
        icon: <UploadFileIcon />,
        link: "/updatepembukuan"
    },
    {
        title: "Update Persediaan",
        icon: <EventAvailableIcon />,
        link: "/updatepersediaan",
    },
]