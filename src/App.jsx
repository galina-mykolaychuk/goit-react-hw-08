// App.jsx

import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { refreshUser } from "./redux/auth/operations";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import { selectIsRefreshing } from "./redux/auth/selectors";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage"),
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing); // Отримання стану isRefreshing

  useEffect(() => {
    const refresh = async () => {
      console.log("Attempting to refresh user");
      try {
        await dispatch(refreshUser()); // Оновлення авторизованого користувача
        console.log("User refreshed successfully");
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    };

    if (!isRefreshing) {
      refresh(); // Запускаємо refresh тільки якщо isRefreshing = false
    }
  }, [dispatch, isRefreshing]); // Виконання useEffect на зміни isRefreshing

  return (
    <>
      <Layout>
        {isRefreshing ? (
          <b>Refreshing user...</b> // Показувати повідомлення тільки під час оновлення
        ) : (
          <Routes>
            <Route index element={<HomePage />} /> {/* Головна сторінка */}
            <Route
              path="register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Routes>
        )}
      </Layout>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
