import React, { useContext, useState } from "react";

import { RiAdminLine } from "react-icons/ri";
import LoginContext from "../context/LoginContext";

export default function LoginPage() {
  const { LoginData } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Regex patterns for validation
  const usernameRegex = /^[a-zA-Z0-9]{5,16}$/;
  const passwordRegex = /^[a-zA-Z0-9_!@#%^&*]{6,20}$/;


  // Username validation handler
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (!usernameRegex.test(value)) {
      setUsernameError(
        "Username should be 5-16 characters and can only include letters, numbers, and underscores."
      );
    } else if (value === "Username") {
      setUsernameError("Username cannot be 'Username'");
    } else {
      setUsernameError("");
    }
  };

  // Password validation handler
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password should be 6-20 characters and can include letters, numbers, and special characters."
      );
    } else {
      setPasswordError("");
    }
  };

  // Form submission handler
  const handleCheck = (e) => {
    e.preventDefault();

    if (!usernameError && !passwordError && username && password) {
      // Call login function from context
      LoginData.login(username, password);
    } else {
      alert("Please correct the errors and try again");
    }
  };

  return (
    <section className="w-full bg-[#F5F5F5] h-[calc(100vh-64px)] flex flex-col items-center sm:flex-row justify-center p-4 overflow-auto">
      <img
        src="https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="max-w-[40%] hidden sm:block rounded-lg shadow-md"
        alt="Login Background"
      />
      <form
        className="bg-white flex flex-col rounded-lg px-6 md:px-10 w-full max-w-md py-8 shadow-lg"
        onSubmit={handleCheck}
      >
        <div className="flex flex-col items-center">
          <RiAdminLine className="text-white bg-primary w-24 h-24 p-5 mb-4 rounded-full" />
          <h1 className="text-2xl font-bold text-center mb-6">
            Log in to your account
          </h1>
        </div>
        <p className="text-center mb-4 text-gray-600">
          Enter your details down below
        </p>
        <div className="form-control my-4">
          <input
            type="text"
            className="bg-transparent focus:outline-none p-3 border-2 border-gray-300 rounded-md mb-2 w-full"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {usernameError}
            </p>
          )}
          <input
            type="password"
            className="bg-transparent focus:outline-none p-3 border-2 border-gray-300 rounded-md mt-4 mb-2 w-full"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {passwordError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-primary hover:bg-primary_hover scale-hover border-none text-white text-lg inline-flex items-center"
        >
          Log in
        </button>
      </form>
    </section>
  );
}
