import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeadphoneProduct from "../components/HeadphoneProduct";
function Headphone() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <HeadphoneProduct></HeadphoneProduct>
      <Footer></Footer>
    </div>
  );
}
export default Headphone;
