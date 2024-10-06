import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import "../module_CSS/Darkmode.css";

const DashboardLightmode = ({ toggleDarkmode, darkmode }) => {
    
    return ( 
        <div className="darkMode" onClick={toggleDarkmode}>
            <MdSunny className={`icon ${darkmode ? 'hide' : 'show'}`} />
            <IoMoon className={`icon ${darkmode ? 'show' : 'hide'}`} />
        </div>
     );
}
 
export default DashboardLightmode;