import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation

const LoginContext = createContext();

const SESSION_EXPIRATION_TIME = 60* 60 * 1000;

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
      // Check expiration on initial load
      const currentTime = new Date().getTime();
      if (user.expirationTime && currentTime > user.expirationTime) {
        // Session expired
        localStorage.removeItem("loggedInUser");
        setLoginState(false);
        setUsernameUpdate("Username");
      } else {
        // Session still valid
        setUsernameUpdate(user.username);
        setLoginState(user.loginState);
      }
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
        const currentTime = new Date().getTime();
        const expirationTime = currentTime + SESSION_EXPIRATION_TIME;
        
        // Save user data with expiration time
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ 
            username, 
            loginState: true, 
            expirationTime,
            loginTime: currentTime 
          })
        );

        setLoginState(true);
        setUsernameUpdate(username);
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

  const checkLoginExpiration = () => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (!user.expirationTime) {
          // If no expiration time is set (for backward compatibility)
          const currentTime = new Date().getTime();
          const expirationTime = currentTime + SESSION_EXPIRATION_TIME;
          
          // Update the stored user data with expiration
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ 
              ...user, 
              expirationTime,
              loginTime: currentTime 
            })
          );
          return true; // Still valid
        }
        
        const currentTime = new Date().getTime();
        if (currentTime > user.expirationTime) {
          // Session expired
          localStorage.removeItem("loggedInUser");
          setLoginState(false);
          setUsernameUpdate("Username");
          
          if (location.pathname !== "/login") {
            navigate("/login");
          }
          return false; // Expired
        }
        
        return true; // Still valid
      } catch (error) {
        // Error parsing stored data
        console.error("Error checking login expiration:", error);
        localStorage.removeItem("loggedInUser");
        setLoginState(false);
        navigate("/login");
        return false;
      }
    }
    return false; // Not logged in
  };
  
  // Function to get remaining session time in minutes
  const getSessionTimeRemaining = () => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.expirationTime) {
          const currentTime = new Date().getTime();
          const remainingMs = user.expirationTime - currentTime;
          if (remainingMs > 0) {
            return Math.floor(remainingMs / 60000); // Convert to minutes
          }
        }
      } catch (error) {
        console.error("Error getting session time:", error);
      }
    }
    return 0;
  };
  
  const LoginData = {
    username: usernameUpdate,
    loginState,
    setUsernameUpdate,
    setLoginState,
    logout,
    login,
    checkLoginExpiration,
    getSessionTimeRemaining,
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
