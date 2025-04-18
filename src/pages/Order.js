import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderHistory from "../components/OrderHistory";
export const Order = () => {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <OrderHistory></OrderHistory>
      <Footer></Footer>
    </div>
  );
};
