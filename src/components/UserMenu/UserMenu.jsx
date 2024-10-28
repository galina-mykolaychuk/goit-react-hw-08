// UserMenu.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, refreshUser } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logOut()); // Змінено logout на logOut
  };

  return (
    <div className={styles.userMenuContainer}>
      {isLoggedIn ? (
        <div className={styles.userInfo}>
          <p>Welcome, {user.name}! </p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className={styles.infoText}>
          Please log in to see your information.
        </p>
      )}
      {isLoggedIn && (
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      )}
    </div>
  );
};

export default UserMenu;
