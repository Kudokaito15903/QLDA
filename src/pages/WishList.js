import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WishlistProduct from "../components/WishlistProduct";

export const WishList = () => {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <WishlistProduct></WishlistProduct>
      <Footer></Footer>
    </div>
  );
};
