import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [usernameUpdate, setUsernameUpdate] = useState("Username");
  const [userId, setUserId] = useState(null);
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái tải
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsernameUpdate(user.username);
      setLoginState(user.loginState);
      setUserId(user.id);
    }
    setIsLoading(false); // Đặt isLoading thành false khi đã hoàn tất
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", { username, password });
      if (response.status === 200) {
        const { username, id } = response.data;
        // console.log("id: ", id)
        setLoginState(true);
        setUsernameUpdate(username);
        setUserId(id);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ username, id, loginState: true })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout");
      setLoginState(false);
      setUsernameUpdate("Username");
      setUserId(null);
      localStorage.removeItem("loggedInUser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/");
  };

  const LoginData = {
    username: usernameUpdate,
    userId,
    loginState,
    setUsernameUpdate,
    setLoginState,
    logout,
    login,
  };

  // Kiểm tra trạng thái tải trước khi render các thành phần khác
  if (isLoading) {
    return <div>Đang tải...</div>; 
  }

  return (
    <LogInContext.Provider value={{ LoginData }}>
      {children}
    </LogInContext.Provider>
  );
}

export default LogInContext;


