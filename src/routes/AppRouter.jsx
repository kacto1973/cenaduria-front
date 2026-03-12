import { createBrowserRouter } from "react-router-dom";
import LoginView from "../views/auth/LoginView";
import MapView from "../views/pos/MapView";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />, // Puerta de entrada (Pública)
  },
  {
    path: "/app",
    element: <MainLayout />, // El Cascarón protector (Privado)
    children: [
      {
        path: "mesas", // La URL será /app/mesas
        element: <MapView />,
      },
      // Aquí agregaremos las demás pantallas de admin después
    ],
  },
]);
