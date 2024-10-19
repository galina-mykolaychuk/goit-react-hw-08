// UserMenu.jsx

import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>User email</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
