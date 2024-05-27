import React from "react";
import '../styles/LoginForm.css';

const LoginForm = () => {
  const validate = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === password && username.length > 1) {
      alert("Login Successful");
      window.localStorage.setItem("loginStatus", "true");
      window.location.href = "/orders"; 
    } else {
      alert("Please enter valid credentials!");
    }
  };

  React.useEffect(() => {
    let status = window.localStorage.getItem("loginStatus");
    if (status === "true") {
      window.location.href = "/orders";
    }
  }, []);

  return (
    <div className="maincontent">
      <form className="LoginPage_LoginForm__3_wtJ">
        <h1>Sign In</h1>
        <input
          className="LoginPage_InputField__2lu1x"
          type="text"
          id="username"
          placeholder="Enter Username"
        />
        <input
          className="LoginPage_InputField__2lu1x"
          type="password"
          id="password"
          placeholder="Enter Password"
        />
        <button
          type="button"
          className="LoginPage_Button__qkLR7"
          onClick={validate}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
