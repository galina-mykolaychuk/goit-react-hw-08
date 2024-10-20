// Layout.jsx

import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const Layout = () => {
  return (
    <div>
      <AppBar />
      <main>
        <Outlet /> {/* Рендеримо вкладені маршрути */}
      </main>
    </div>
  );
};

export default Layout;
