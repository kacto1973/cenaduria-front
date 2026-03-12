import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout-container bg-gray-100 min-h-screen">
      {/* Aquí irá tu Banner de "Sin Conexión" después */}
      <header className="bg-red-500 text-white p-2 text-center">
        Navbar / Banner Offline
      </header>

      {/* Aquí se renderizan las vistas hijas (MapView, Dashboard, etc) */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
