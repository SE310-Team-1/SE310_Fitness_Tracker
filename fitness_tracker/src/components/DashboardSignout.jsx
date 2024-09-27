import '../module_CSS/DashboardSignout.css';
import axios from 'axios';

const DashboardSignout = () => {

    function signOut() {
        console.log("Signing out...");
        axios
            .post("http://localhost:4001/user/logout", {}, { withCredentials: true, })
            .then((response) => {
                console.log("API response:", response.data);
                window.location.href = "/login";    
            })
            .catch((error) => {
                console.error("Error logging out ", error);
            });
    }

    return (  
        <div className="thingy">
            <button className='button' onClick={signOut}>Sign Out</button>
        </div>
     );
}
 
export default DashboardSignout;