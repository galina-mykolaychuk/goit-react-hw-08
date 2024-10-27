// LoginForm.jsx

import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Іконка для email
import { IoIosLock } from "react-icons/io"; // Іконка для пароля
import Visibility from "@mui/icons-material/Visibility"; // Іконка видимості пароля
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Іконка приховування пароля
import { AppProvider } from "@toolpad/core/AppProvider"; // Провайдер для контексту
import { SignInPage } from "@toolpad/core/SignInPage"; // Компонент для входу
import { useTheme } from "@mui/material/styles"; // Хук для теми
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations"; // Імпорт операцій для логіна

const providers = [{ id: "credentials", name: "Email and Password" }];

// Компонент для поля вводу email
function CustomEmailField() {
  return (
    <TextField
      id="email" // Додаємо id для валідації
      label="Email"
      name="email" // Додаємо name для валідації
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
      autoComplete="email" // Додаємо атрибут autocomplete
    />
  );
}

// Компонент для поля вводу пароля
function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false); // Показ/приховування пароля

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); // Запобігання за замовчуванням
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="password">
        Password
      </InputLabel>
      <OutlinedInput
        id="password" // Додаємо id для валідації
        type={showPassword ? "text" : "password"}
        name="password" // Додаємо name для валідації
        size="small"
        startAdornment={
          <InputAdornment position="start">
            <IoIosLock size={20} />
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
        autoComplete="current-password" // Додаємо атрибут autocomplete
      />
    </FormControl>
  );
}

// Компонент для чекбокса "Remember me"
function RememberMeCheckbox() {
  return (
    <FormControlLabel
      control={<Checkbox size="small" />}
      label="Remember me"
      sx={{ mb: 2, justifyContent: "flex-start" }}
    />
  );
}

// Кнопка входу
function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      sx={{
        backgroundColor: "#1B1B23",
        color: "white",
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
      size="small"
      disableElevation
      fullWidth
    >
      Login
    </Button>
  );
}

// Посилання для реєстрації
function SignUpLink() {
  return (
    <Link href="/register" variant="body2">
      Register
    </Link>
  );
}

// Основний компонент входу
export default function LoginForm() {
  const theme = useTheme(); // Отримуємо тему
  const navigate = useNavigate(); // Хук для навігації
  const dispatch = useDispatch(); // Хук для доступу до dispatch

  // Обробка події надсилання форми
  const handleSubmit = async (event) => {
    event.preventDefault(); // Запобігання перезавантаженню сторінки
    const formData = new FormData(event.currentTarget); // Отримуємо дані з форми
    await handleSignIn("credentials", formData); // Викликаємо функцію логіну
  };

  const handleSignIn = async (provider, formData) => {
    const email = formData.get("email"); // Отримуємо email з форми
    const password = formData.get("password"); // Отримуємо пароль з форми

    // Додаємо валідацію
    if (!email || !password) {
      toast.error("Please fill in both fields."); // Сповіщення про помилку
      return;
    }

    try {
      // Викликаємо логін через Redux
      await dispatch(login({ email, password })).unwrap();

      // Якщо вхід успішний, перенаправляємо користувача
      toast.success(`Welcome, ${email}!`); // Сповіщення про успішний вхід
      navigate("/contacts"); // Перенаправлення на сторінку контактів
    } catch (error) {
      toast.error(`Failed to sign in: ${error.message}`); // Сповіщення про помилку
    }
  };

  return (
    <AppProvider theme={theme}>
      {/* Витягуємо компонент <SignInPage> з форми */}
      <SignInPage
        signIn={handleSignIn} // Передаємо функцію логіну
        slots={{
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          rememberMeCheckbox: RememberMeCheckbox,
        }}
        providers={providers}
        hideTitle
      />
    </AppProvider>
  );
}
