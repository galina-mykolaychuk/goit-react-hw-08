// Navigation.jsx

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Button from "@mui/material/Button"; // Використання кнопок Material UI
import Box from "@mui/material/Box";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації

  return (
    <Box component="nav">
      {/* Використання Box для кращої стилізації */}
      <Button
        component={NavLink}
        to="/"
        className={styles.link} // Безпосереднє використання стилю
        style={({ isActive }) => ({
          fontWeight: "bold",
          color: isActive ? "#ed3b44" : "white",
          textTransform: "none",
        })}
      >
        HOME
      </Button>
      {isLoggedIn && ( // Відображаємо "Contacts" тільки для авторизованих користувачів
        <Button
          component={NavLink}
          to="/contacts"
          className={styles.link} // Безпосереднє використання стилю
          style={({ isActive }) => ({
            fontWeight: "bold",
            color: isActive ? "#ed3b44" : "white",
            textTransform: "none",
          })}
        >
          CONTACTS
        </Button>
      )}
    </Box>
  );
};

export default Navigation;
