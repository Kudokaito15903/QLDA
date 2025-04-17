import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [usernameUpdate, setUsernameUpdate] = useState("Username");
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Sử dụng useLocation để lấy url hiện tại
  const [url, setUrl] = useState(location.pathname); // Khởi tạo url từ đường dẫn hiện tại

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsernameUpdate(user.username);
      setLoginState(user.loginState);
    }
    setIsLoading(false);
  }, []);

  // Cập nhật url mỗi khi location thay đổi
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", { username, password });
      if (response.status === 200) {
        const { username } = response.data;
        setLoginState(true);
        setUsernameUpdate(username);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, loginState: true })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your username and password.");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/admin/logout");
      setLoginState(false);
      setUsernameUpdate("Username");
      localStorage.removeItem("loggedInUser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/login");
  };

  const LoginData = {
    username: usernameUpdate,
    loginState,
    setUsernameUpdate,
    setLoginState,
    logout,
    login,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginContext.Provider value={{ LoginData, url }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;
