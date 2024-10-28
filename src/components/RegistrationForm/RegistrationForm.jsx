// RegistrationForm.jsx

import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Link,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { PiLockKeyFill } from "react-icons/pi";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";

const registeredEmails = ["test@example.com", "user@example.com"];

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    if (registeredEmails.includes(email)) {
      setError("Email is already registered.");
      return;
    }

    try {
      await dispatch(register({ name: username, email, password }));
      toast.success("Registration complete! Welcome!");
      navigate("/contacts", { replace: true });
    } catch (error) {
      // Перевірка на помилку дублікату
      if (error.code === 11000) {
        setError(
          "This email is already registered. Please use a different email.",
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        p: 2,
        borderRadius: 2,
        boxShadow: 5,
        backgroundColor: "background.paper",
      }}
    >
      <form onSubmit={handleRegister} autoComplete="off">
        {error && <div style={{ color: "red" }}>{error}</div>}{" "}
        {/* Показуємо помилки */}
        {/* Поле Username */}
        <TextField
          id="username"
          label="Username"
          name="username"
          type="text"
          size="small"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle fontSize="inherit" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ my: 1 }}
          autoComplete="off" // не зберігаємо нік користувача
        />
        {/* Поле Email */}
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          size="small"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="inherit" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ my: 1 }}
          autoComplete="email" // зберігаємо імейл для автозаповнення
        />
        {/* Поле Password */}
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
          <InputLabel htmlFor="password" size="small">
            Password *
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <PiLockKeyFill style={{ fontSize: "1.25rem", lineHeight: 0 }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="inherit" />
                  ) : (
                    <Visibility fontSize="inherit" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{ my: 1 }}
            autoComplete="new-password" // зберігаємо пароль для автозаповнення
          />
        </FormControl>
        {/* Register Button */}
        <Button
          type="submit"
          variant="contained"
          size="small"
          disableElevation
          fullWidth
          sx={{
            my: 2,
            backgroundColor: "#1B1B23",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Register
        </Button>
        {/* Link to Login */}
        <Link
          href="/login"
          variant="body2"
          sx={{ display: "block", textAlign: "center" }}
        >
          Already registered?
        </Link>
      </form>
    </Box>
  );
}

export default RegistrationForm;
