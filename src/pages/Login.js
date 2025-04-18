import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LogInForm";
import { useEffect, useState } from "react";

function Login() {
  return (
    <div className="component-container">
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default Login;
