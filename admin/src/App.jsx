import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import User from './pages/User.jsx'
import LoginContext from './context/LoginContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx'; 
export default function App() {
  const { LoginData, url } = useContext(LoginContext);
  return (
      <div className="max-h-screen flex flex-col">
        <Navbar />
        <div className="sm:grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-[#F5F5F5] min-h-[calc(100vh-64px)]">
          {LoginData.loginState && url !== "/login" && <Sidebar />}
          <main className="overflow-auto p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </main>
        </div>
      </div>
  )
}
