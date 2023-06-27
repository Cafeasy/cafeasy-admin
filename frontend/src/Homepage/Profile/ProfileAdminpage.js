import { NavLink } from "react-router-dom"
import Sidebarcomp from "../Sidebarcomp"
import ProfileAdmincomp from "./ProfileAdmincomp"

const ProfileAdminpage = () => {
    return (
    <div>
       <Sidebarcomp/>
       <ProfileAdmincomp/>
    </div>
    )
}

export default ProfileAdminpage