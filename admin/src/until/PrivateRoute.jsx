import { Navigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../context/LoginContext";

export default function PrivateRoute({children}){
    const {LoginData} = useContext(LoginContext);
    if(!LoginData.loginState){
      return <Navigate to="/login"/>
    }
    return children;
  }