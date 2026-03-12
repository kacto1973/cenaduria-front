import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Descomenta esto para navegar
import { loginUsuario } from "../../services/userService";

const LoginView = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate(); // Hook para movernos entre pantallas

  // Función para capturar los clics en los números
  const handleNumberClick = (num) => {
    // Tu doc dice que el PIN es único y personal.
    // Vamos a limitar la vista a mostrar máximo 5 puntos/asteriscos visualmente.
    if (pin.length < 5) {
      setPin((prev) => prev + num);
      setError(""); // Limpiamos cualquier error previo al empezar a escribir
    }
  };

  // Función para borrar el último dígito ingresado
  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  // Función para enviar el PIN al Backend al presionar "Entrar"
  const handleLogin = async () => {
    // Validación mínima en el frontend antes de gastar datos/batería
    if (pin.length !== 5) {
      setError("El PIN debe tener 5 dígitos");
      return;
    }

    try {
      console.log("Simulando envío de PIN al servidor:", pin);

      // ---------------------------------------------------------
      // 🚀 CONEXIÓN REAL CON EL BACKEND
      // ---------------------------------------------------------
      const response = await loginUsuario(pin); // Llamada real al servicio de login

      // Si la respuesta es exitosa (200 OK):
      // 1. Guardaríamos los datos del usuario/token en el Contexto Global
      // 2. Emitiríamos el evento de Socket.io: socket.emit("USER_CONNECTED", { user_id: ... })
      // 3. navigate('/app/mesas'); // Nos vamos al mapa de mesas
      // ---------------------------------------------------------

      // SIMULACIÓN DE ÉXITO POR AHORA (Borrar esto luego)
      console.log("Login exitoso, datos del usuario:", response.data);
      // navigate('/app/mesas');
    } catch (err) {
      // Si el backend responde con 401 (Incorrecto) o 403 (Desactivado)
      setError("PIN incorrecto o usuario inactivo. Intenta de nuevo.");
      setPin(""); // Limpiamos el PIN pad para seguridad
    }
  };

  return (
    // Contenedor principal: ocupa toda la pantalla, fondo gris claro, centra el contenido
    <div className="flex h-screen w-full bg-gray-100 items-center justify-center p-4">
      {/* Tarjeta del Login: Blanca, bordes redondeados, sombra suave. Ancho máximo controlado */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-md flex flex-col items-center border border-gray-100">
        {/* Encabezado: Nombre del negocio y subtítulo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            Los Álamos
          </h1>
          <p className="text-gray-500 font-medium">Punto de Venta Móvil</p>
        </div>

        {/* 📟 PANTALLA DEL PIN (Visualización de asteriscos) */}
        {/* Mobile First: Ocupa todo el ancho, texto gigante centrado, bordes grandes */}
        <div className="w-full bg-gray-50 text-center text-4xl tracking-widest py-5 rounded-2xl mb-5 border-2 border-gray-200 h-20 flex items-center justify-center font-mono shadow-inner">
          {/* Reemplazamos cada número por un punto '•' para privacidad */}
          {pin.replace(/./g, "•") || (
            <span className="text-gray-300">------</span>
          )}
        </div>

        {/* Área de Mensajes de Error */}
        <div className="h-6 mb-4 w-full text-center">
          {error && (
            <p className="text-red-500 text-sm font-semibold animate-pulse">
              {error}
            </p>
          )}
        </div>

        {/* 🔢 EL PIN PAD (Teclado Numérico Táctil) */}
        {/* Mobile First: Usamos un Grid de 3 columnas con huecos grandes para no fallar el clic */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Botones del 1 al 9 generados dinámicamente */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              // Tailwind: Botón grande, texto 3xl, bordes suaves, cambio de color al toque
              className="bg-gray-100 active:bg-gray-200 text-gray-800 text-3xl font-bold py-5 rounded-2xl transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              {num}
            </button>
          ))}

          {/* Botón de BORRAR (Rojo suave) */}
          <button
            onClick={handleDelete}
            className="bg-red-50 active:bg-red-100 text-red-600 text-2xl font-bold py-5 rounded-2xl transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-red-100 flex items-center justify-center"
          >
            {/* Icono opcional de borrar (puedes usar un texto "X" si prefieres) */}
            ⌫
          </button>

          {/* Botón del CERO */}
          <button
            onClick={() => handleNumberClick("0")}
            className="bg-gray-100 active:bg-gray-200 text-gray-800 text-3xl font-bold py-5 rounded-2xl transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            0
          </button>

          {/* Botón de ENTRAR (Azul Cenaduría) */}
          <button
            onClick={handleLogin}
            className="bg-blue-600 active:bg-blue-700 text-white text-2xl font-bold py-5 rounded-2xl transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center justify-center"
          >
            ✓
          </button>
        </div>

        {/* Espacio extra abajo para que no quede pegado al borde en móviles */}
        <div className="mt-8 text-center text-xs text-gray-400">
          v1.0 - Cenaduría Los Álamos POS
        </div>
      </div>
    </div>
  );
};

export default LoginView;
