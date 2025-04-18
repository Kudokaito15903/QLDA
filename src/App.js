import "./App.css";
import Home from "./pages/Home";
import {  Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { LogInProvider } from "./context/LogInContext";
import { CartProvider } from "./context/CartContext";
import Phones from "./pages/Phones";
import Tablets from "./pages/Tablets";
import Laptop from "./pages/Laptop";
import Headphone from "./pages/Headphone";
import Chatbot from "./pages/Chatbot";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { ProductProvider } from "./context/ProductContext";
import SearchPage from "./pages/SearchPage";
import { Profile } from "./pages/Profile";
import { Order } from "./pages/Order";
import { WishList } from "./pages/WishList";
import { WishlistProvider } from "./context/WishlistContext";
import NotFoundPage from "./pages/NotFoundPage";
import { useContext } from "react";
import LogInContext from "./context/LogInContext";
import { SuccessPayment } from "./pages/SuccessPayment";
import { CancelPayment } from "./pages/CancelPayment";
import { UserOrderDetails } from "./pages/UserOrderDetails";
import GetResetEmail from "./pages/GetResetEmail";
import GetOTP from "./pages/GetOTP";
import GetChangePassword from "./pages/GetChangePassword";
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
        <ProductProvider>
            <CartProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<PublicRoute><Login></Login></PublicRoute>}></Route>
                <Route path="/signup" element={<PublicRoute><SignUp></SignUp></PublicRoute>}></Route>
                <Route path="/phone" element={<Phones></Phones>}></Route>
                <Route path="/tablet" element={<Tablets></Tablets>}></Route>
                <Route path="/laptop" element={<Laptop></Laptop>}></Route>
                <Route
                  path="/headphone"
                  element={<Headphone></Headphone>}
                ></Route>
                <Route path="/chatbot" element={<Chatbot></Chatbot>}></Route>
                <Route path="/product/:id" element={<ProductPage></ProductPage>} />
                <Route path="/cart" element={<CartPage></CartPage>}></Route>
                <Route
                  path="/checkout"
                  element={<CheckoutPage></CheckoutPage>}
                ></Route>
                <Route path="/search/:searchText" element={<SearchPage />} />
                <Route path="/profile" element={<PrivateRoute><Profile></Profile></PrivateRoute>}></Route>
                <Route
                  path="/order"
                  element={<PrivateRoute><Order></Order></PrivateRoute>}
                ></Route>
                <Route path="/order-details/:id" element={<PrivateRoute><UserOrderDetails></UserOrderDetails></PrivateRoute>}></Route>
                <Route path="/wishlist" element={<WishList></WishList>}></Route>
                <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
                <Route path="/successful" element={<SuccessPayment></SuccessPayment>}></Route>
                <Route path="/cancel" element={<CancelPayment></CancelPayment>}></Route>
                <Route path="/getEmail" element={<PublicRoute><GetResetEmail></GetResetEmail></PublicRoute>}></Route>
                <Route path="/getOTP" element={<PublicRoute><GetOTP></GetOTP></PublicRoute>}></Route>
                <Route path="/changePassword" element={<PublicRoute><GetChangePassword></GetChangePassword></PublicRoute>}></Route>
              </Routes>
              </WishlistProvider>
            </CartProvider>
        </ProductProvider>
        </LogInProvider>
    </>
  );
}

export default App;
