import "./App.css";
import Home from "./pages/Home";
import {  Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { LogInProvider } from "./context/LogInContext";
import { Profile } from "./pages/Profile";
import LogInContext from "./context/LogInContext";

function PrivateRoute({children}){
  const {LoginData} = useContext(LogInContext);
  if(!LoginData.loginState){
    return <Navigate to="/login"/>
  }
  return children;
}
function PublicRoute({children}){
  const {LoginData} = useContext(LogInContext);
  if(LoginData.loginState){
    return <Navigate to="/profile"/>
  }
  return children;
}
function App() {
  return (
    <>
      <LogInProvider>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<PublicRoute><Login></Login></PublicRoute>}></Route>
        <Route path="/signup" element={<PublicRoute><SignUp></SignUp></PublicRoute>}></Route>
        <Route path="/profile" element={<PrivateRoute><Profile></Profile></PrivateRoute>}></Route>
      </LogInProvider>
    </>
  );
}

export default App;
