// Layout.jsx

import { Outlet } from "react-router-dom";
import CustomAppBar from "../AppBar/AppBar"; // Імпорт CustomAppBar

const Layout = () => {
  return (
    <div>
      <CustomAppBar /> {/* Використання нового компоненту CustomAppBar */}
      <main>
        <Outlet /> {/* Рендеримо вкладені маршрути */}
      </main>
    </div>
  );
};

export default Layout;
