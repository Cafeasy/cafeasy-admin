import "../Homepage/Sidebarpage.css";
import { Sidebardata } from "./Sidebardata";

function Sidebarcomp () {
    return (
        <><div className="Sidebar"></div><ul>
            {Sidebardata.map((val, key) => {
                return (
                    <li
                        key={key}
                        onClick={() => {
                            Window.location.pathname  = val.link;
                        } }
                    >
                        {""}
                        <div>{val.icon}</div>
                        <div>{val.title}</div>
                    </li>
                );
            })}
        </ul></>
    )
}

export default Sidebarcomp;