import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LaptopProduct from "../components/LaptopProduct";
function Laptop() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <LaptopProduct></LaptopProduct>
      <Footer></Footer>
    </div>
  );
}
export default Laptop;
