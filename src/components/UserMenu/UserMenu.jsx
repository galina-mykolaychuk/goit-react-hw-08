// UserMenu.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, refreshUser } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Отримуємо дані користувача з Redux state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Перевіряємо, чи залогінений користувач

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
};

export default UserMenu;
