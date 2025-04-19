import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import User from './pages/User.jsx'
import LoginContext from './context/LoginContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx'; 
import Product from './pages/Product.jsx';
import Reviews from './pages/Reviews.jsx';
import Orders from './pages/Orders.jsx';
import AddProduct from './components/Product/AddProduct.jsx';
import { ProtectedRoute, PublicRoute } from './middleware/AuthMiddleware';
export default function App() {
  const { LoginData, url } = useContext(LoginContext);
  return (
      <div className="max-h-screen flex flex-col">
        <Navbar />
        <div className="sm:grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5] min-h-[calc(100vh-64px)]">
          {LoginData.loginState && url !== "/login" && <Sidebar />}
          <main className="overflow-auto p-4">
            <Routes>
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />  

              {/* Admin Management */} 
                         
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user" 
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/product" 
                element={
                  <ProtectedRoute>
                    <Product />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/product/add-product" 
                element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reviews" 
                element={
                  <ProtectedRoute>
                    <Reviews />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
  )
}
