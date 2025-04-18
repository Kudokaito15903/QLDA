import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
function Home() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <Banner></Banner>
      <ProductList></ProductList>
      <Footer></Footer>
    </div>
  );
}
export default Home;
