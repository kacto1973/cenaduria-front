import api from "./api";

export const getCurrentSession = async () => {
  return await api.get("/sessions/current");
};

export const openSession = async (user_id, initial_cash) => {
  return await api.post("/sessions/open", { user_id, initial_cash });
};

export const closeSession = async (session_id, user_id) => {
  return await api.post("/sessions/close", { session_id, user_id });
};
