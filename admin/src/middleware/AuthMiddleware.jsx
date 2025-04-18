import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const ProtectedRoute = ({ children }) => {
  const { LoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Kiểm tra thời hạn phiên đăng nhập
    const checkSession = () => {
      // Kiểm tra trạng thái đăng nhập và thời hạn
      const isValid = LoginData.checkLoginExpiration();
      setIsSessionValid(isValid && LoginData.loginState);
      setIsChecking(false);
      
      // Nếu không hợp lệ, chuyển hướng về trang login
      if (!isValid || !LoginData.loginState) {
        navigate('/login');
      }
    };
    
    checkSession();
    
    // Kiểm tra thời hạn phiên đăng nhập định kỳ mỗi phút
    const intervalId = setInterval(checkSession, 60000);
    
    return () => {
      clearInterval(intervalId); // Xóa interval khi component unmount
    };
  }, [LoginData, navigate]);

  // Hiển thị indicator khi đang kiểm tra
  if (isChecking) {
    return <div className="flex justify-center items-center h-screen">Đang kiểm tra phiên đăng nhập...</div>;
  }

  return isSessionValid ? children : null;
};

const PublicRoute = ({ children }) => {
  const { LoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Kiểm tra thời hạn phiên đăng nhập
    const isValid = LoginData.checkLoginExpiration();
    setIsSessionValid(isValid && LoginData.loginState);
    setIsChecking(false);
    
    // Nếu đã đăng nhập và phiên còn hạn, chuyển hướng về trang chủ
    if (isValid && LoginData.loginState) {
      navigate('/');
    }
  }, [LoginData, navigate]);

  // Hiển thị indicator khi đang kiểm tra
  if (isChecking) {
    return <div className="flex justify-center items-center h-screen">Đang kiểm tra phiên đăng nhập...</div>;
  }

  // Nếu chưa đăng nhập hoặc phiên hết hạn, hiển thị component con
  // Nếu đã đăng nhập và phiên còn hạn, không hiển thị gì (useEffect sẽ chuyển hướng)
  return !isSessionValid ? children : null;
};

export { ProtectedRoute, PublicRoute }; 