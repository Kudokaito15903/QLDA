import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import VerifyOTP from "../components/VerifyOTP";

const GetOTP = () => {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <VerifyOTP></VerifyOTP>
      <Footer></Footer>
    </div>
  );
};

export default GetOTP;
