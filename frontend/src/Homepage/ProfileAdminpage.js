import { NavLink } from "react-router-dom"
import Sidebarcomp from "../Homepage/Sidebarcomp"
import ProfileAdmincomp from "../Homepage/ProfileAdmincomp"

const ProfileAdminpage = () => {
    return (
    <div>
       <Sidebarcomp/>
       <ProfileAdmincomp/>
    </div>
    )
}

export default ProfileAdminpage