import Navbar from "../components/Navbar";
import ChangePassword from "../components/ChangePassword";
import Footer from "../components/Footer";
const GetChangePassword = () =>{
    return(
        <div className="component-container">
            <Navbar></Navbar>
            <ChangePassword></ChangePassword>
            <Footer></Footer>
        </div>
    )
}
export default GetChangePassword;