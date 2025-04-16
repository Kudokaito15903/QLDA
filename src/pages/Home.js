import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="component-container">
      <Navbar></Navbar>
      <Banner></Banner>
      <Footer></Footer>
    </div>
  );
}
export default Home;
