import axios from "axios";

// 1. Creamos la instancia base de Axios
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // URL de tu backend
  headers: {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true",
  },
});

// ==========================================
// 🛫 ADUANA DE SALIDA (Request Interceptor)
// ==========================================
api.interceptors.request.use(
  (config) => {
    // Aquí, en el futuro, buscaremos el JWT guardado en la tablet
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config; // Dejamos que el paquete siga su camino
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ==========================================
// 🛬 ADUANA DE ENTRADA (Response Interceptor)
// ==========================================
api.interceptors.response.use(
  // 🟢 CUANDO EL BACKEND RESPONDE BIEN (Status 200 al 299)
  (response) => {
    // response.data es el JSON que armaste con tu 'sendResponse'
    // Retornamos directamente tu objeto normalizado
    return response.data;
  },

  // 🔴 CUANDO EL BACKEND RESPONDE MAL (Status 400, 401, 403, 404, 500)
  (error) => {
    // Si el error viene de tu backend (o sea, usaste sendResponse con error)
    if (error.response && error.response.data) {
      // Extraemos tu objeto de error
      const backendError = error.response.data;

      // Lanzamos un error de JavaScript usando EL MENSAJE QUE TÚ ESCRIBISTE en el backend
      // Ej: "Ese PIN ya está en uso" o "Este usuario está desactivado"
      return Promise.reject(new Error(backendError.message));
    }

    // Si el servidor está apagado o no hay internet
    if (error.request) {
      return Promise.reject(
        new Error("No hay conexión con el servidor. Revisa tu Wi-Fi."),
      );
    }

    // Cualquier otro error raro de React
    return Promise.reject(new Error("Ocurrió un error inesperado"));
  },
);

export default api;
