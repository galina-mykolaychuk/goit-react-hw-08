// AuthNav.jsx

import { NavLink } from "react-router-dom";

const AuthNav = () => (
  <div>
    <NavLink to="/register">Register</NavLink>
    <NavLink to="/login">Login</NavLink>
  </div>
);

export default AuthNav;
