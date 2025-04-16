import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogInContext = createContext();

export function LogInProvider({ children }) {
  const [usernameUpdate, setUsernameUpdate] = useState("Username");
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái tải
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsernameUpdate(user.username);
      setLoginState(user.loginState);
    }
    setIsLoading(false); // Đặt isLoading thành false khi đã hoàn tất
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", { username, password });
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
      await axios.post("http://localhost:8080/api/users/logout");
      setLoginState(false);
      setUsernameUpdate("Username");
      localStorage.removeItem("loggedInUser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/");
  };

  const LoginData = {
    username: usernameUpdate,
    loginState,
    setUsernameUpdate,
    setLoginState,
    logout,
    login,
  };

  // Kiểm tra trạng thái tải trước khi render các thành phần khác
  if (isLoading) {
    return <div>Loading...</div>; // hoặc một UI loading nào đó
  }

  return (
    <LogInContext.Provider value={{ LoginData }}>
      {children}
    </LogInContext.Provider>
  );
}

export default LogInContext;


