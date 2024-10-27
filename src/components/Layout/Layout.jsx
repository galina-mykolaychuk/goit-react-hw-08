// Layout.jsx

import { Suspense } from "react";
import CustomAppBar from "../AppBar/AppBar"; // Імпорт CustomAppBar

const Layout = ({ children }) => {
  return (
    <div>
      <CustomAppBar /> {/* Використання нового компоненту CustomAppBar */}
      <main>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        {/* Відображення children з індикатором завантаження */}
      </main>
    </div>
  );
};

export default Layout;
