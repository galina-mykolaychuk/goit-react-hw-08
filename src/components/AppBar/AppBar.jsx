// AppBar.jsx

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import Button from "@mui/material/Button"; // Material UI Button
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import Box from "@mui/material/Box";

const CustomAppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Отримуємо статус авторизації

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1B1B23" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Phonebook
          </Typography>
          <Navigation /> {/* Вставляємо навігаційний компонент */}
          {isLoggedIn ? <UserMenu /> : <AuthNav />}{" "}
          {/* Компоненти на основі авторизації */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
