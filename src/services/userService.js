import api from "./api";

export const loginUsuario = async (pin) => {
  return await api.post("/users/login", { pin });
};

export const getUsers = async () => {
  return await api.get("/users/");
};

export const createUser = async (userData) => {
  // userData = { name, pin, role }
  return await api.post("/users/", userData);
};

export const toggleUserStatus = async (user_id) => {
  return await api.put("/users/toggle-status", { user_id });
};
