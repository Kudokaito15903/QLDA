import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

/**
 * Middleware bảo vệ các route admin
 * Chỉ cho phép truy cập khi đã đăng nhập
 * @param {JSX.Element} children - Component con cần bảo vệ
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
  const { LoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    if (!LoginData.loginState) {
      // Nếu chưa đăng nhập, chuyển hướng về trang login
      navigate('/login');
    }
  }, [LoginData.loginState, navigate]);

  // Nếu đã đăng nhập, hiển thị component con
  // Nếu chưa đăng nhập, không hiển thị gì cả (useEffect sẽ chuyển hướng)
  return LoginData.loginState ? children : null;
};

/**
 * Middleware cho trang login
 * Nếu đã đăng nhập, chuyển hướng về trang chủ
 * @param {JSX.Element} children - Component con
 * @returns {JSX.Element}
 */
const PublicRoute = ({ children }) => {
  const { LoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng về trang chủ
    if (LoginData.loginState) {
      navigate('/');
    }
  }, [LoginData.loginState, navigate]);

  // Nếu chưa đăng nhập, hiển thị component con
  // Nếu đã đăng nhập, không hiển thị gì cả (useEffect sẽ chuyển hướng)
  return !LoginData.loginState ? children : null;
};

export { ProtectedRoute, PublicRoute }; 