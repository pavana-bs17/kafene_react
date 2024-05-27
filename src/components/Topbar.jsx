import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Topbar.css';
import logo from '../assests/logo.png';

const Topbar = () => {
  return (
    <div className="Topbar_Topbar">
      <div className="Topbar_LogoWrapper">
        <img src={logo} alt="logo" />
        <p className="Topbar_BrandName">Kafene</p>
      </div>
      <nav>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>Orders</NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink>
        <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Users</NavLink>
      </nav>
      <p id="logout" onClick={logOut}>Logout</p>
    </div>
  );

  function logOut() {
    window.localStorage.setItem("loginStatus", "false");
    window.location.href = "/login";
  }
};

export default Topbar;
