// AuthNav.jsx

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button"; // Використання кнопок Material UI
import Box from "@mui/material/Box"; // Використання Box для кращої стилізації
import styles from "./AuthNav.module.css";

const AuthNav = () => (
  <Box className={styles.authNav} component="div">
    <Button
      component={NavLink}
      to="/register"
      className={styles.link} // Задаємо клас без функції
      sx={{
        fontWeight: "bold",
        color: "white",
        "&:hover": { color: "#ed3b44" },
        textTransform: "none",
      }}
    >
      REGISTER
    </Button>
    <Button
      component={NavLink}
      to="/login"
      className={styles.link}
      sx={{
        fontWeight: "bold",
        color: "white",
        "&:hover": { color: "#ed3b44" },
        textTransform: "none",
      }}
    >
      LOGIN
    </Button>
  </Box>
);

export default AuthNav;
